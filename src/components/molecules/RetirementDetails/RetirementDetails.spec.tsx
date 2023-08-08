import { render } from '@testing-library/react'
import { RetirementDetails } from './RetirementDetails'
import { UNIT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  it(`renders correctly with no project`, () => {
    const { container } = render(<RetirementDetails unit={undefined} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with validation`, () => {
    const { container } = render(<RetirementDetails unit={UNIT_DETAIL} />)
    expect(container).toMatchSnapshot()
  })
})
