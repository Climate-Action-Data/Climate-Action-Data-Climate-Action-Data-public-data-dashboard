import { render } from '@testing-library/react'
import { ProjectDocuments } from './ProjectDocuments'

describe(`RetirementDetails`, () => {
  it(`renders correctly project issuances`, () => {
    const { container } = render(<ProjectDocuments />)
    expect(container).toMatchSnapshot()
  })
})
