import { render } from '@testing-library/react'
import { OriginalIssuanceDetails } from './OriginalIssuanceDetails'
import { UNIT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  it(`renders correctly with no project`, () => {
    const { container } = render(<OriginalIssuanceDetails unit={undefined} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with validation`, () => {
    const { container } = render(<OriginalIssuanceDetails unit={UNIT_DETAIL} />)
    expect(container).toMatchSnapshot()
  })
})
