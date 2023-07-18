import { render } from '@testing-library/react'
import { Tooltip } from './Tooltip'

it(`renders correctly`, () => {
  const { container } = render(<Tooltip>My Text</Tooltip>)
  expect(container).toMatchSnapshot()
})
