import { render } from '@testing-library/react'
import { RemoveCompareIcon } from './RemoveCompareIcon'

it(`renders correctly`, () => {
  const { container } = render(<RemoveCompareIcon />)
  expect(container).toMatchSnapshot()
})
