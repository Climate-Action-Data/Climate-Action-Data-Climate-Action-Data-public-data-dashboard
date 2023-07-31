import { render } from '@testing-library/react'
import { ChevronRightIcon } from './ChevronRightIcon'

it(`renders correctly`, () => {
  const { container } = render(<ChevronRightIcon />)
  expect(container).toMatchSnapshot()
})
