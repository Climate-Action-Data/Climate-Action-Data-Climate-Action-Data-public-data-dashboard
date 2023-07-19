import { render } from '@testing-library/react'
import { TestOvermindWrapper } from './TestOvermindWrapper'
it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <>test</>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
