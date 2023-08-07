import { render } from '@testing-library/react'
import { UnitSearchBodyHeader } from './UnitSearchBodyHeader'

it(`renders correctly`, () => {
  const { container } = render(<UnitSearchBodyHeader />)
  expect(container).toMatchSnapshot()
})
