import { render } from '@testing-library/react'
import { LinkedInIcon } from './LinkedInIcon'

it(`renders correctly`, () => {
  const { container } = render(<LinkedInIcon />)
  expect(container).toMatchSnapshot()
})
