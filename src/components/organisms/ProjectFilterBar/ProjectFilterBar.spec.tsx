import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockData } from '@/test/TestOvermindMockData'
import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'
import { TestRouter } from '@/test/TestRouter'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

const push = jest.fn()

it(`renders correctly with no data`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <ProjectFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data and search click`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <TestRouter router={{ push }}>
        <ProjectFilterBar />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const button = screen.getByTestId(`search-button`)
  fireEvent.click(button)
  expect(container).toMatchSnapshot()
})
