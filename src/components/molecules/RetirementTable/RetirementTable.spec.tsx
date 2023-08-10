import { render } from '@testing-library/react'
import { RetirementTable } from './RetirementTable'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(<RetirementTable issuances={PROJECT_DETAIL.issuances} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<RetirementTable issuances={[]} />)
    expect(container).toMatchSnapshot()
  })
})
