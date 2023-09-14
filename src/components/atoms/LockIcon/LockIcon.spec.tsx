import { render } from '@testing-library/react'
import { LockIcon } from './LockIcon'

it(`renders correctly`, () => {
  const { container } = render(<LockIcon />)
  expect(container).toMatchSnapshot()
})
