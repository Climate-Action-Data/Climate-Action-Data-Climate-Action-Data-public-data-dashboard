import { render } from '@testing-library/react'
import { ProjectSearchBodyHeader } from './ProjectSearchBodyHeader'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectSearchBodyHeader />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
