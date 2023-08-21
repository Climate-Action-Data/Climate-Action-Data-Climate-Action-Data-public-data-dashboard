import { render } from '@testing-library/react'
import { WatchlistsIcon } from './WatchlistsIcon'

it(`renders correctly`, () => {
  const { container } = render(<WatchlistsIcon />)
  expect(container).toMatchSnapshot()
})
