import { render } from '@testing-library/react'
import { CalendarIcon } from './CalendarIcon'

it(`renders correctly`, () => {
  const { container } = render(<CalendarIcon />)
  expect(container).toMatchSnapshot()
})
