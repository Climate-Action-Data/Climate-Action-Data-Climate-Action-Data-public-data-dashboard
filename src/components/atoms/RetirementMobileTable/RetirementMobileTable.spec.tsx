import { render } from '@testing-library/react'
import { RetirementMobileTable } from './RetirementMobileTable'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'
import { UnitStatus } from '@/@types/Unit'

describe(`RetirementMobileTable`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(<RetirementMobileTable retirements={PROJECT_DETAIL.issuances[0].units.filter((unit) => unit?.status === UnitStatus.RETIRED)} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<RetirementMobileTable retirements={[]} />)
    expect(container).toMatchSnapshot()
  })
})
