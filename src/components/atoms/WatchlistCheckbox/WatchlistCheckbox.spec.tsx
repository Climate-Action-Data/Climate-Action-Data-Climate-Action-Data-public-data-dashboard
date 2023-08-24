import { render, screen, fireEvent } from '@testing-library/react'
import { WatchlistCheckbox } from './WatchlistCheckbox'
import { watchlistData } from '@/test/mock-data/watchlist_data'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const PROJECT_ID = `eb21d827-5a9c-43a5-97ff-a9e37e01a72a`
const DEFAULT_SELECTED_WATCHLISTS = [`eb21d827-5a9c-43a5-97ff-a9e37e01a72a`]
it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <WatchlistCheckbox selectedWatchlists={DEFAULT_SELECTED_WATCHLISTS} watchlists={watchlistData} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly empty`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <WatchlistCheckbox selectedWatchlists={DEFAULT_SELECTED_WATCHLISTS} watchlists={[]} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and check checkbox`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <WatchlistCheckbox selectedWatchlists={DEFAULT_SELECTED_WATCHLISTS} watchlists={watchlistData} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  const checkboxes = screen.getAllByTestId(`checkbox-watchlist`)
  expect(checkboxes.length).toBeGreaterThan(0)
  fireEvent.click(checkboxes[0])
  expect(container).toMatchSnapshot()
})
