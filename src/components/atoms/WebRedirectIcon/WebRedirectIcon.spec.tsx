import { render } from '@testing-library/react'
import { WebRedirectIcon } from './WebRedirectIcon'

it(`renders correctly`, () => {
  const { container } = render(<WebRedirectIcon />)
  expect(container).toMatchSnapshot()
})
