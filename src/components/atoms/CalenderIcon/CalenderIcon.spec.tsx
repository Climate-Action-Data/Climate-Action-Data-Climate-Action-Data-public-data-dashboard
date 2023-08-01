import { render } from '@testing-library/react'
import { CalenderIcon } from './CalenderIcon'

it(`renders correctly`, () => {
  const { container } = render(<CalenderIcon />)
  expect(container).toMatchSnapshot()
})
