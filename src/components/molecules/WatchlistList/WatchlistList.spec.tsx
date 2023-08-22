import { render } from '@testing-library/react'
import { WatchlistList } from './WatchlistList'
import { watchlistData } from '@/test/mock-data/watchlist_data'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <WatchlistList watchlists={watchlistData} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly empty`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <WatchlistList watchlists={[]} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})
