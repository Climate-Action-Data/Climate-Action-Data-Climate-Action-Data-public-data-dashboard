import { render } from '@testing-library/react'
import { FilterCountIndicator } from './FilterCountIndicator'

it(`renders correctly`, () => {
  const { container } = render(<FilterCountIndicator count={1} />)
  expect(container).toMatchSnapshot()
})
