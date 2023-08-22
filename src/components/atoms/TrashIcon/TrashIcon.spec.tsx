import { render } from '@testing-library/react'
import { TrashIcon } from './TrashIcon'

it(`renders correctly`, () => {
  const { container } = render(<TrashIcon />)
  expect(container).toMatchSnapshot()
})
