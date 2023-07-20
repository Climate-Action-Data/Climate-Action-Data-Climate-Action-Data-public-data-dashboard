import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'

describe(`CreditsHistoryChart`, () => {
  test(`renders loading state when creditsHistoryData is undefined`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CreditsHistoryChart />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the widget when carbonMapData and creditsHistoryData are defined`, () => {
    const { container } = render(
      <TestOvermindWrapper creditsHistory={MockData.CREDIT_HISTORY_DATA}>
        <CreditsHistoryChart />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
