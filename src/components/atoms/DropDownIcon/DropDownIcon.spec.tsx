import { render } from '@testing-library/react'
import { DropDownIcon } from './DropDownIcon'

it(`renders correctly`, () => {
  const { container } = render(<DropDownIcon />)
  expect(container).toMatchSnapshot()
})
