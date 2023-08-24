import { render } from '@testing-library/react'
import { Menu } from './Menu'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <Menu />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
