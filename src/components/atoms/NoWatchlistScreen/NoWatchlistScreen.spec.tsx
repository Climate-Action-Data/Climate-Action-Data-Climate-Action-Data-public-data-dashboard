import { render } from '@testing-library/react'
import { NoWatchlistScreen } from './NoWatchlistScreen'

it(`renders correctly`, () => {
  const { container } = render(<NoWatchlistScreen />)
  expect(container).toMatchSnapshot()
})
