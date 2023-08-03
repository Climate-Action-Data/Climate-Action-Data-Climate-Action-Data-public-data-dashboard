import { render } from '@testing-library/react'
import { ProjectDetailsInfo } from './ProjectDetailsInfo'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

it(`renders correctly with no project`, () => {
  const { container } = render(<ProjectDetailsInfo project={undefined} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with project`, () => {
  const { container } = render(<ProjectDetailsInfo project={PROJECT_DETAIL} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with project that had emptyBenefit`, () => {
  const { container } = render(<ProjectDetailsInfo project={{ ...PROJECT_DETAIL, coBenefits: [] }} />)
  expect(container).toMatchSnapshot()
})
