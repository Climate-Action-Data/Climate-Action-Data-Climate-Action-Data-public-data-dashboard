import { render } from '@testing-library/react'
import { ChevronLeftIcon } from './ChevronLeftIcon'

it(`renders correctly`, () => {
  const { container } = render(<ChevronLeftIcon />)
  expect(container).toMatchSnapshot()
})
