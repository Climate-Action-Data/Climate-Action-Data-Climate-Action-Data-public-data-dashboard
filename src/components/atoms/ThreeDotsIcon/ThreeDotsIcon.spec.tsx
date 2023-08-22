import { render } from '@testing-library/react'
import { ThreeDotsIcon } from './ThreeDotsIcon'

it(`renders correctly`, () => {
  const { container } = render(<ThreeDotsIcon />)
  expect(container).toMatchSnapshot()
})
