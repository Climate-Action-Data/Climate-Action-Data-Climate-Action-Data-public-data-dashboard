import { render } from '@testing-library/react'
import { AddCompareIcon } from './AddCompareIcon'

it(`renders correctly`, () => {
  const { container } = render(<AddCompareIcon />)
  expect(container).toMatchSnapshot()
})
