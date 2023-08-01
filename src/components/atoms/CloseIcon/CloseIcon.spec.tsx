import { render } from '@testing-library/react'
import { CloseIcon } from './CloseIcon'

it(`renders correctly`, () => {
  const { container } = render(<CloseIcon />)
  expect(container).toMatchSnapshot()
})
