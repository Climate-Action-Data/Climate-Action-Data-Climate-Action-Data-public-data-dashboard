import { render, screen, fireEvent } from '@testing-library/react'
import WatchlistPage from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

const INDEX_RECENTLY_ADDED = 0
const INDEX_ALPHABETICAL = 1
const INDEX_PROJECTS = 2

it(`renders correctly with sort Recents`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  fireEvent.click(screen.getByTestId(`dropdown-button`))
  const items = screen.getAllByTestId(`dropdown-item`)
  expect(items.length).toBeGreaterThan(0)
  fireEvent.click(items[INDEX_RECENTLY_ADDED])
  expect(container).toMatchSnapshot()
})

it(`renders correctly with sort Alphabetical`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  fireEvent.click(screen.getByTestId(`dropdown-button`))
  const items = screen.getAllByTestId(`dropdown-item`)
  expect(items.length).toBeGreaterThan(0)
  fireEvent.click(items[INDEX_ALPHABETICAL])
  expect(container).toMatchSnapshot()
})

it(`renders correctly with sort Projects`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  fireEvent.click(screen.getByTestId(`dropdown-button`))
  const items = screen.getAllByTestId(`dropdown-item`)
  expect(items.length).toBeGreaterThan(0)
  fireEvent.click(items[INDEX_PROJECTS])
  expect(container).toMatchSnapshot()
})

const DELAY_FOR_RENDER = 3000

it(`should set watchlists correctly when sorting`, async () => {
  render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  const project = screen.getAllByTestId(`watchlist-summary-item`)
  expect(project.length).toBeGreaterThan(0)
})

it(`should set watchlists correctly when searching`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  fireEvent.input(screen.getByTestId(`search-watchlist`), { target: { value: `Elec` } })
  const project = screen.getAllByTestId(`watchlist-summary-item`)
  expect(project.length).toBeGreaterThan(0)
  expect(container).toMatchSnapshot()
})

it(`should set watchlists correctly when searching and going back`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  fireEvent.input(screen.getByTestId(`search-watchlist`), { target: { value: `Elec` } })
  fireEvent.input(screen.getByTestId(`search-watchlist`), { target: { value: `` } })
  const project = screen.getAllByTestId(`watchlist-summary-item`)
  expect(project.length).toBeGreaterThan(0)
  expect(container).toMatchSnapshot()
})
