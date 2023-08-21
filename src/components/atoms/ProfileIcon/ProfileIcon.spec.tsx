import { render } from '@testing-library/react'
import { ProfileIcon } from './ProfileIcon'

it(`renders correctly`, () => {
  const { container } = render(<ProfileIcon />)
  expect(container).toMatchSnapshot()
})
