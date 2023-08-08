import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectSearchBar from '@/components/organisms/ProjectSearchBar/ProjectSearchBar'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(<ProjectSearchBar />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with no params, add a search value and submits a search`, async () => {
  const { container } = render(<ProjectSearchBar />)
  await userEvent.type(screen.getByRole(`textbox`), `hello`)
  await userEvent.click(screen.getByTestId(`search-bar-clear`))
  await userEvent.click(screen.getByTestId(`search-bar-search`))
  expect(mockPush).toBeCalledTimes(1)
  expect(container).toMatchSnapshot()
})
