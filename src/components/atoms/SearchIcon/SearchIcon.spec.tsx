import { render } from '@testing-library/react'
import { SearchIcon } from './SearchIcon'

it(`renders correctly`, () => {
  const { container } = render(<SearchIcon />)
  expect(container).toMatchSnapshot()
})
