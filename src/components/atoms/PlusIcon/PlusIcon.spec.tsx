import { render } from '@testing-library/react'
import { PlusIcon } from './PlusIcon'

it(`renders correctly`, () => {
  const { container } = render(<PlusIcon />)
  expect(container).toMatchSnapshot()
})
