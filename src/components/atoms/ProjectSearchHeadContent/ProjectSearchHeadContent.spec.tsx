import { render } from '@testing-library/react'

import { ProjectSearchHeadContent } from './ProjectSearchHeadContent'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})
