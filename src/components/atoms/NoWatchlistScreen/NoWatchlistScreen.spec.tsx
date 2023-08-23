import { fireEvent, render, screen } from '@testing-library/react'
import { NoWatchlistScreen } from './NoWatchlistScreen'

it(`renders correctly`, () => {
  const { container } = render(<NoWatchlistScreen />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly`, () => {
  const mockClick = jest.fn()
  const { container } = render(<NoWatchlistScreen onClick={mockClick} />)
  fireEvent.click(screen.getByTestId(`no-watchlist-create-button`))
  expect(mockClick).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
