import { render } from '@testing-library/react'
import { RetirementTable } from './RetirementTable'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'
import { UnitStatus } from '@/@types/Unit'

describe(`RetirementDetails`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(<RetirementTable retirements={PROJECT_DETAIL.issuances[0].units.filter((unit) => unit?.status === UnitStatus.RETIRED)} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<RetirementTable retirements={[]} />)
    expect(container).toMatchSnapshot()
  })
})
