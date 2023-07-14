import { render } from '@testing-library/react'
import { HelpIcon } from './HelpIcon'

it(`renders correctly`, () => {
  const { container } = render(<HelpIcon />)
  expect(container).toMatchSnapshot()
})
