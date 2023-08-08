import { render } from '@testing-library/react'
import IssuancePage from './page'
import { UNIT_DETAIL } from '@/test/TestOvermindMockData'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

describe(`IssuancePage`, () => {
  it(`renders correctly`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <IssuancePage params={{ id: UNIT_DETAIL.warehouseUnitId }} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
