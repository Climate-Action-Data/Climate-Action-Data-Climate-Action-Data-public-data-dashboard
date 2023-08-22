import { render, screen, fireEvent } from '@testing-library/react'
import { WatchlistMenu } from './WatchlistMenu'
import { TestRouter } from '@/test/TestRouter'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const DEFAULT_ID = `72a9e45b-bd64-4083-b4a9-7661e05f1183`

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlistId={DEFAULT_ID} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click rename`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlistId={DEFAULT_ID} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const renameButton = screen.getByTestId(`watchlist-rename`)
  fireEvent.click(renameButton)
  expect(container).toMatchSnapshot()
})

const DEFAULT_RENDER_TIMEOUT = 2000

it(`renders correctly and click delete`, async () => {
  const mockPush = jest.fn()
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{ push: mockPush }}>
        <WatchlistMenu watchlistId={DEFAULT_ID} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const renameButton = screen.getByTestId(`watchlist-delete`)
  fireEvent.click(renameButton)
  await new Promise((r) => setTimeout(r, DEFAULT_RENDER_TIMEOUT))
  const confirmModal = screen.getByTestId(`confirm-modal`)
  fireEvent.click(confirmModal)
  expect(mockPush).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
