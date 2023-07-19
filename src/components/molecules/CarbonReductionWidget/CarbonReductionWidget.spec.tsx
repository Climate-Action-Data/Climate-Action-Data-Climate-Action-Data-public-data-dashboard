import { render } from '@testing-library/react'
import { CarbonReductionWidget } from './CarbonReductionWidget'
import { TestOvermindWrapper } from '@/components/atoms/TestOvermindWrapper/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CarbonReductionWidget />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
