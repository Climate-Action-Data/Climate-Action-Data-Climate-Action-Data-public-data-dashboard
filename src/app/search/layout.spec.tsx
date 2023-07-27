import { render } from '@testing-library/react'
import layout from './layout'

it(`renders correctly`, () => {
  const { container } = render(layout({ children: <>test</> }))

  expect(container).toMatchSnapshot()
})
