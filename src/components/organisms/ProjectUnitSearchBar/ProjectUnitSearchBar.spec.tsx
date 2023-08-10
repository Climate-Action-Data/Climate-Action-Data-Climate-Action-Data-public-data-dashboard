import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectUnitSearchBar from '@/components/organisms/ProjectUnitSearchBar/ProjectUnitSearchBar'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly for project search`, () => {
  const { container } = render(<ProjectUnitSearchBar isProjectSearch={true} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly for unit search`, () => {
  const { container } = render(<ProjectUnitSearchBar isProjectSearch={false} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly for project search with no params, add a search value and submits a search`, async () => {
  const { container } = render(<ProjectUnitSearchBar isProjectSearch={true} />)
  await userEvent.type(screen.getByRole(`textbox`), `hello`)
  await userEvent.click(screen.getByTestId(`search-bar-clear`))
  await userEvent.click(screen.getByTestId(`search-bar-search`))
  expect(mockPush).toBeCalledTimes(1)
  expect(container).toMatchSnapshot()
})
