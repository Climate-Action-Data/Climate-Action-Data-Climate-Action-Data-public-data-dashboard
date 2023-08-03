import { render } from '@testing-library/react'
import { ScrollIcon } from './ScrollIcon'

it(`renders correctly`, () => {
  const { container } = render(<ScrollIcon />)
  expect(container).toMatchSnapshot()
})
