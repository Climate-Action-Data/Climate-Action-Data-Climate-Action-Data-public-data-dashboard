import { render } from '@testing-library/react'
import { LightModeIcon } from './LightModeIcon'

it(`renders correctly`, () => {
  const { container } = render(<LightModeIcon />)
  expect(container).toMatchSnapshot()
})
