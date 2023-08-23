import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCompareResultDrawer } from './ProjectCompareResultDrawer'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'

it(`ProjectCompareResultDrawer renders correctly`, () => {
  const { container } = render(<ProjectCompareResultDrawer isOpen={true} onClose={jest.fn()} projects={[...(PROJECT_SEARCH_RESULT.projectResults?.data?.projects ?? [])]} />)
  expect(container).toMatchSnapshot()
})

const createUrlMock = jest.fn()
const revokeUrlMock = jest.fn()
beforeAll(() => {
  window.URL.createObjectURL = createUrlMock
  window.URL.revokeObjectURL = revokeUrlMock
})
it(`creates a link and downloads`, () => {
  render(<ProjectCompareResultDrawer isOpen={true} onClose={jest.fn()} projects={[...(PROJECT_SEARCH_RESULT.projectResults?.data?.projects ?? [])]} />)
  const downloadButton = screen.getByTestId(`export-comparison-button`)

  fireEvent.click(downloadButton)

  const invisibleLink = screen.getByTestId(`invisible-link`) ?? undefined

  expect(createUrlMock).toHaveBeenCalled()
  expect(revokeUrlMock).toHaveBeenCalled()
  expect(invisibleLink).toBeDefined()
})
