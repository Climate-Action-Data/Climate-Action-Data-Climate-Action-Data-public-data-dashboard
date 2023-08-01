import { render } from '@testing-library/react'
import { TitleIcon } from './TitleIcon'

it(`renders correctly`, () => {
  const { container } = render(<TitleIcon />)
  expect(container).toMatchSnapshot()
})
