import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/organisms/SearchBar/SearchBar'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(<SearchBar />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with no params, add a search value and submits a search`, async () => {
  const { container } = render(<SearchBar />)
  await userEvent.type(screen.getByRole(`textbox`), `hello`)
  await userEvent.click(screen.getByTestId(`search-bar-clear`))
  await userEvent.click(screen.getByTestId(`search-bar-search`))
  expect(mockPush).toBeCalledTimes(1)
  expect(container).toMatchSnapshot()
})
