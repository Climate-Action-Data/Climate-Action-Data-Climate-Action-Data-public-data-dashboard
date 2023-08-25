import { render } from '@testing-library/react'
import { CADIcon } from './CADIcon'

it(`renders correctly`, () => {
  const { container } = render(<CADIcon />)
  expect(container).toMatchSnapshot()
})
