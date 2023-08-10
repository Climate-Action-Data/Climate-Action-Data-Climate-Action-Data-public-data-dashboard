import { render } from '@testing-library/react'
import { IssuanceTable } from './IssuanceTable'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(<IssuanceTable issuances={PROJECT_DETAIL.issuances} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<IssuanceTable issuances={[]} />)
    expect(container).toMatchSnapshot()
  })
})
