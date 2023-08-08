import { render } from '@testing-library/react'
import RetirementPage from './page'
import { UNIT_DETAIL } from '@/test/TestOvermindMockData'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

describe(`RetirementPage`, () => {
  it(`renders correctly`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <RetirementPage params={{ id: UNIT_DETAIL.warehouseUnitId }} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
