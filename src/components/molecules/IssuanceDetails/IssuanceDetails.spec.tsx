import { render } from '@testing-library/react'
import { IssuanceDetails } from './IssuanceDetails'
import { issuanceDetail } from '@/test/mock-data/issuance_detail'

it(`renders correctly with no project`, () => {
  const { container } = render(<IssuanceDetails issuance={undefined} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with validation`, () => {
  const { container } = render(<IssuanceDetails issuance={issuanceDetail} />)
  expect(container).toMatchSnapshot()
})
