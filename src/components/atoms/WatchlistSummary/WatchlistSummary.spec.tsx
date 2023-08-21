import { render } from '@testing-library/react'
import { WatchlistSummary } from './WatchlistSummary'
import { watchlistData } from '@/test/mock-data/watchlist_data'

it(`renders correctly`, () => {
  const { container } = render(<WatchlistSummary watchlist={watchlistData[0]} />)
  expect(container).toMatchSnapshot()
})
