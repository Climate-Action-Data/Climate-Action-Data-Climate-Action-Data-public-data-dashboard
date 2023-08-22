import { render } from '@testing-library/react'
import { ProjectCompareResultDrawer } from './ProjectCompareResultDrawer'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'

it(`ProjectCompareResultDrawer renders correctly`, () => {
  const { container } = render(<ProjectCompareResultDrawer isOpen={false} onClose={jest.fn()} projects={[...(PROJECT_SEARCH_RESULT.projectResults?.data?.projects ?? [])]} />)
  expect(container).toMatchSnapshot()
})
