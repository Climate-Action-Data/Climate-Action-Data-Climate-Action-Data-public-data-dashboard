import { render } from '@testing-library/react'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'

describe(`credit history stat`, () => {
  const SMALL_AMOUNT = 123
  const LARGE_AMOUNT = 123123123

  it(`renders correctly with small amount`, () => {
    const { container } = render(<CreditsHistoryStat amount={SMALL_AMOUNT} label={`label`} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with large amount`, () => {
    const { container } = render(<CreditsHistoryStat amount={LARGE_AMOUNT} label={`label`} />)
    expect(container).toMatchSnapshot()
  })
})
