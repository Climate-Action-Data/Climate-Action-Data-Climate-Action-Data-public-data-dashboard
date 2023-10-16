import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'
import CreditHistoryLineChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryLineChart'
import { calculateTickCount } from '@/components/molecules/CreditsHistoryChart/CreditsHistoryLineChart'

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

describe(`calculateTickCount`, () => {
  it(`correctly calculates the tick count when dataLength is less than maxTickCount`, () => {
    const dataLength = 5
    const maxTickCount = 12
    const result = calculateTickCount(dataLength, maxTickCount)
    expect(result).toBe(dataLength)
  })

  it(`correctly calculates the tick count when dataLength is greater than maxTickCount`, () => {
    const dataLength = 15
    const maxTickCount = 12
    const result = calculateTickCount(dataLength, maxTickCount)
    expect(result).toBe(maxTickCount)
  })

  it(`correctly calculates the tick count when dataLength is equal to maxTickCount`, () => {
    const dataLength = 12
    const maxTickCount = 12
    const result = calculateTickCount(dataLength, maxTickCount)
    expect(result).toBe(maxTickCount)
  })
})
