import { render } from '@testing-library/react'
import { CompareIcon } from './CompareIcon'

it(`renders correctly`, () => {
  const { container } = render(<CompareIcon />)
  expect(container).toMatchSnapshot()
})
