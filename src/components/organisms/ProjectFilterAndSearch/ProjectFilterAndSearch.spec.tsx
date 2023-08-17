import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { fireEvent, render, screen } from '@testing-library/react'
import ProjectFilterAndSearch from '@/components/organisms/ProjectFilterAndSearch/ProjectFilterAndSearch'

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

it(`ProjectFilterAndSearch renders correctly and the filter-and-search-trigger was clicked`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectFilterAndSearch />
    </TestOvermindWrapper>,
  )

  fireEvent.click(screen.getByTestId(`filter-and-search-trigger`))
  fireEvent.click(screen.getByTestId(`filter-and-search-trigger`))

  expect(container).toMatchSnapshot()
})
