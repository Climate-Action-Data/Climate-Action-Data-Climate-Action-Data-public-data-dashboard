import { render } from '@testing-library/react'
import { ChevronDownIcon } from './ChevronDownIcon'

it(`renders correctly`, () => {
  const { container } = render(<ChevronDownIcon />)
  expect(container).toMatchSnapshot()
})
