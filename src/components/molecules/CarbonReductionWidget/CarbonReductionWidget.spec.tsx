import { render, screen } from '@testing-library/react'

import { CarbonReductionWidget } from './CarbonReductionWidget'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'

describe(`CarbonReductionWidget`, () => {
  test(`renders loading state when carbonMapData is undefined`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CarbonReductionWidget />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
    expect(screen.getByTestId(`loading-indicator`)).toBeDefined()
  })

  test(`renders the widget when carbonMapData and carbonMapDataFiltered are defined`, () => {
    const { container } = render(
      <TestOvermindWrapper analytics={MockData.STATE_CARBON_FULL}>
        <CarbonReductionWidget />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
