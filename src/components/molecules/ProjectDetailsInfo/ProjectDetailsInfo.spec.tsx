import { render } from '@testing-library/react'
import { ProjectDetailsInfo } from './ProjectDetailsInfo'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`ProjectDetailsInfo`, () => {
  const tYear = 2023
  const tMonth = 7
  const tDay = 1
  const tDate = new Date(tYear, tMonth, tDay)

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(tDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it(`renders correctly with no project`, () => {
    const { container } = render(<ProjectDetailsInfo project={undefined} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with project`, () => {
    const { container } = render(<ProjectDetailsInfo project={PROJECT_DETAIL} />)
    expect(container).toMatchSnapshot()
  })
})

it(`renders correctly with project that had emptyBenefit`, () => {
  const { container } = render(<ProjectDetailsInfo project={{ ...PROJECT_DETAIL, coBenefits: [] }} />)
  expect(container).toMatchSnapshot()
})
it(`renders correctly with project that had empty dates`, () => {
  const mockProject: any = { ...PROJECT_DETAIL, validation: { ...PROJECT_DETAIL.validation } }
  mockProject.statusDate = undefined
  mockProject.validation.date = undefined
  mockProject.units.creditingPeriodStart = undefined
  mockProject.units.creditingPeriodEnd = undefined

  const { container } = render(<ProjectDetailsInfo project={{ ...mockProject }} />)
  expect(container).toMatchSnapshot()
})
