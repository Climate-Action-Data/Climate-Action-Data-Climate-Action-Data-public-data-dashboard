import { render } from '@testing-library/react'
import { IssuancesRetirements } from './IssuancesRetirements'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  it(`renders correctly project issuances`, () => {
    const { container } = render(<IssuancesRetirements project={PROJECT_DETAIL} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly project issuances`, () => {
    const { container } = render(<IssuancesRetirements project={{ ...PROJECT_DETAIL, issuances: [PROJECT_DETAIL.issuances[0]] }} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly project issuances`, () => {
    const { container } = render(<IssuancesRetirements project={{ ...PROJECT_DETAIL, issuances: [] }} />)
    expect(container).toMatchSnapshot()
  })
})
