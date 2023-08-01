import { render } from '@testing-library/react'
import { MinusIcon } from './MinusIcon'

it(`renders correctly`, () => {
  const { container } = render(<MinusIcon />)
  expect(container).toMatchSnapshot()
})
