import { render } from '@testing-library/react'
import { WatchlistList } from './WatchlistList'
import { watchlistData } from '@/test/mock-data/watchlist_data'

it(`renders correctly`, () => {
  const { container } = render(<WatchlistList watchlists={watchlistData} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly empty`, () => {
  const { container } = render(<WatchlistList watchlists={[]} />)
  expect(container).toMatchSnapshot()
})
