import { fireEvent, render, screen } from '@testing-library/react'
import { WatchlistProjects } from './WatchlistProjects'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'

const DEFAULT_WATCHLIST_ID = `ded2d120-e7ee-4ce6-afd2-b54106c229da`

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <WatchlistProjects watchlistId={DEFAULT_WATCHLIST_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly on table data`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <WatchlistProjects watchlistId={DEFAULT_WATCHLIST_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
it(`renders correctly on table data and scroll page`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <WatchlistProjects watchlistId={DEFAULT_WATCHLIST_ID} />
    </TestOvermindWrapper>,
  )

  const scrollableContainer = screen.getByTestId(`table-scroll`)

  fireEvent.scroll(scrollableContainer, { target: { scrollBy: 600 } })

  expect(container).toMatchSnapshot()
})

it(`renders correctly and click next page`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <WatchlistProjects watchlistId={DEFAULT_WATCHLIST_ID} />
    </TestOvermindWrapper>,
  )

  const inputElement = screen.getByTestId(`pagination-page-up`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
})
