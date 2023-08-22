import { render, screen, fireEvent } from '@testing-library/react'
import { WatchlistSummary } from './WatchlistSummary'
import { watchlistData } from '@/test/mock-data/watchlist_data'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <WatchlistSummary watchlist={watchlistData[0]} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and redirects`, () => {
  const pushMock = jest.fn()

  const { container } = render(
    <TestRouter router={{ push: pushMock }}>
      <WatchlistSummary watchlist={watchlistData[0]} />
    </TestRouter>,
  )
  const watchlist = screen.getByTestId(`watchlist-summary-item`)
  fireEvent.click(watchlist)
  expect(container).toMatchSnapshot()
})
