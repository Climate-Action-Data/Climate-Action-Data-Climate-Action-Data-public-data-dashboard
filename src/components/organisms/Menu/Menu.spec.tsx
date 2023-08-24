import { render } from '@testing-library/react'
import { Menu } from './Menu'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <Menu />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
