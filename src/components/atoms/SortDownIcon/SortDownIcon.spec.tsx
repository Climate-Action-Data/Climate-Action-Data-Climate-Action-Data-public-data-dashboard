import { render } from '@testing-library/react'
import { SortDownIcon } from './SortDownIcon'

it(`renders correctly`, () => {
  const { container } = render(<SortDownIcon />)
  expect(container).toMatchSnapshot()
})
