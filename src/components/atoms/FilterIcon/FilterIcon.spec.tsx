import { render } from '@testing-library/react'
import { FilterIcon } from './FilterIcon'

it(`renders correctly`, () => {
  const { container } = render(<FilterIcon />)
  expect(container).toMatchSnapshot()
})
