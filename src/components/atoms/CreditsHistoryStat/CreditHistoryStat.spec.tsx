import { render } from '@testing-library/react'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'

it(`renders correctly`, () => {
  const { container } = render(<CreditsHistoryStat amount={123} label={`label`} />)
  expect(container).toMatchSnapshot()
})
