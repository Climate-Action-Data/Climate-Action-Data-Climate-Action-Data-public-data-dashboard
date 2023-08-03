import { render } from '@testing-library/react'
import { ProjectDetailsVerification } from './ProjectDetailsVerification'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

it(`renders correctly with no project`, () => {
  const { container } = render(<ProjectDetailsVerification validation={undefined} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with validation`, () => {
  const { container } = render(<ProjectDetailsVerification validation={PROJECT_DETAIL.validation} />)
  expect(container).toMatchSnapshot()
})
