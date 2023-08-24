import { render } from '@testing-library/react'
import { NoProjectsWatchlist } from './NoProjectsWatchlist'

it(`renders correctly`, () => {
  const { container } = render(<NoProjectsWatchlist />)
  expect(container).toMatchSnapshot()
})
