import { render } from '@testing-library/react'
import { BellIcon } from './BellIcon'

it(`renders correctly`, () => {
  const { container } = render(<BellIcon />)
  expect(container).toMatchSnapshot()
})
