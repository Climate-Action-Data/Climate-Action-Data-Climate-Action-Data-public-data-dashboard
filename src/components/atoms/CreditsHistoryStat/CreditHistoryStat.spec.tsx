import { render } from '@testing-library/react'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'

describe(`credit history stat`, () => {
  it(`renders correctly with small amount`, () => {
    const { container } = render(<CreditsHistoryStat amount={123} label={`label`} />)
    expect(container).toMatchSnapshot()
  })
  it(`renders correctly with large amount`, () => {
    const { container } = render(<CreditsHistoryStat amount={123123123} label={`label`} />)
    expect(container).toMatchSnapshot()
  })
})
