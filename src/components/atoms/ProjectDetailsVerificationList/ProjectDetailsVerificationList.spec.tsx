import { fireEvent, render, screen } from '@testing-library/react'
import { ProjectDetailsVerificationList } from './ProjectDetailsVerificationList'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`ProjectDetailsVerificationList`, () => {
  it(`renders correctly with full array`, () => {
    const { container } = render(<ProjectDetailsVerificationList verificationList={PROJECT_DETAIL.validation.verifications} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with full array and click`, () => {
    const { container } = render(<ProjectDetailsVerificationList verificationList={PROJECT_DETAIL.validation.verifications} />)
    const expandButton = screen.getByTestId(`verification-expand`)
    fireEvent.click(expandButton)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<ProjectDetailsVerificationList verificationList={[]} />)
    expect(container).toMatchSnapshot()
  })
})
