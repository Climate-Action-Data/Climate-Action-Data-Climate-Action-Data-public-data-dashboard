import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render, screen } from '@testing-library/react'
import ProjectFilterAndSearch from '@/components/organisms/ProjectFilterAndSearch/ProjectFilterAndSearch'
import userEvent from '@testing-library/user-event'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`ProjectFilterAndSearch renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectFilterAndSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`ProjectFilterAndSearch renders correctly and the filter-and-search-trigger was clicked`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectFilterAndSearch />
    </TestOvermindWrapper>,
  )

  await userEvent.click(screen.getByTestId(`filter-and-search-trigger`))
  await userEvent.click(screen.getByTestId(`filter-and-search-trigger`))

  expect(container).toMatchSnapshot()
})
