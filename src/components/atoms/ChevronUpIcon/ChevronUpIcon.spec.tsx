import { render } from '@testing-library/react'
import { ChevronUpIcon } from './ChevronUpIcon'

it(`renders correctly`, () => {
  const { container } = render(<ChevronUpIcon />)
  expect(container).toMatchSnapshot()
})
