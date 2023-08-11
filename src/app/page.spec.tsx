import { render } from '@testing-library/react'
import Home from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <Home />
    </TestOvermindWrapper>,
  )
  expect(container).toBeTruthy()
})
