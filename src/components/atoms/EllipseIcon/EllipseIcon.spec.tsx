import { render } from '@testing-library/react'
import { EllipseIcon } from './EllipseIcon'

it(`renders correctly`, () => {
  const { container } = render(<EllipseIcon />)
  expect(container).toMatchSnapshot()
})
