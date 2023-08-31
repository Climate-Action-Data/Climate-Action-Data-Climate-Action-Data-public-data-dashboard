import { render } from '@testing-library/react'
import { IssuanceDetails } from './IssuanceDetails'
import { issuanceDetail } from '@/test/mock-data/issuance_detail'
import { Issuance } from '@/@types/Issuance'

it(`renders correctly with no project`, () => {
  const { container } = render(<IssuanceDetails issuance={undefined} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with validation`, () => {
  const { container } = render(<IssuanceDetails issuance={issuanceDetail} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly without tags`, () => {
  const issuanceDetailWithoutTags: Issuance = { ...issuanceDetail, issuanceTags: undefined }
  const { container } = render(<IssuanceDetails issuance={issuanceDetailWithoutTags} />)
  expect(container).toMatchSnapshot()
})
