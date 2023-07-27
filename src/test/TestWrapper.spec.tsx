import { render } from '@testing-library/react'
import { TestWrapper } from './TestWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestWrapper className="hoverClass">
      <p>Hello World</p>
    </TestWrapper>,
  )
  expect(container).toMatchSnapshot()
})
