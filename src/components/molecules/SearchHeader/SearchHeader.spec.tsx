import { render, screen } from '@testing-library/react'
import { SearchHeader } from '@/components/molecules/SearchHeader/SearchHeader'
import userEvent from '@testing-library/user-event'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(<SearchHeader />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and clear the search values`, async () => {
  const { container } = render(<SearchHeader />)
  await userEvent.clear(screen.getByRole(`textbox`))
  expect(container).toMatchSnapshot()
})

jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => undefined }),
}))

it(`renders correctly with no params, add a search value and submits a search`, async () => {
  const { container } = render(<SearchHeader />)
  await userEvent.type(screen.getByRole(`textbox`), `hello`)
  await userEvent.click(screen.getByTestId(`search-header-button`))
  expect(mockPush).toBeCalledTimes(1)
  expect(container).toMatchSnapshot()
})
