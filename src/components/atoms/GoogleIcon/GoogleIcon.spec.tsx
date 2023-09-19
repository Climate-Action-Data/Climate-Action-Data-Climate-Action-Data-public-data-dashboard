import { render } from '@testing-library/react'
import { GoogleIcon } from './GoogleIcon'

it(`renders correctly`, () => {
  const { container } = render(<GoogleIcon />)
  expect(container).toMatchSnapshot()
})
