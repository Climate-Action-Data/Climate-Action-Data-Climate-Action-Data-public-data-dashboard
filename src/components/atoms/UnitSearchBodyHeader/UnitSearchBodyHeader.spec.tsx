import { render } from '@testing-library/react'
import { UnitSearchBodyHeader } from './UnitSearchBodyHeader'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitSearchBodyHeader />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
