import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'
import CreditHistoryLineChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryLineChart'

describe(`CreditsHistoryChart`, () => {
  test(`renders loading state when creditsHistoryData is undefined`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CreditHistoryLineChart data={MockData.CREDIT_HISTORY_CHART_DATA} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
