import { render } from '@testing-library/react'
import { HamburgerIcon } from './HamburgerIcon'

it(`renders correctly`, () => {
  const { container } = render(<HamburgerIcon />)
  expect(container).toMatchSnapshot()
})
