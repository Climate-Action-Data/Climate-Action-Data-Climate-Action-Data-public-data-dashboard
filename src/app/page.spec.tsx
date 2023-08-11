import { render } from '@testing-library/react'
import Home from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <Home />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toBeTruthy()
})
