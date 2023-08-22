import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render } from '@testing-library/react'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { ProjectCompareWidget } from './ProjectCompareWidget'

it(`ProjectCompareWidget renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <ProjectCompareWidget isVisible={true} projects={PROJECT_SEARCH_RESULT.projectResults?.data?.projects ?? []} onCompare={jest.fn()} onClose={jest.fn()} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
