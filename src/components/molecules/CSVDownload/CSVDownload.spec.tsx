import { render, screen, fireEvent } from '@testing-library/react'
import { CSVDownload } from './CSVDownload'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { CSVExportFilenames, CSVExportTypes } from '@/@types/CSV'
import { createAndDownloadCsv } from '../../../utils/CsvHelper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.PROJECT} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly as unit`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.UNIT} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly as unit and click`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.UNIT} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  expect(container).toMatchSnapshot()
})
it(`renders correctly as pattern and click`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.PROJECT} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and creates modal on 1k export `, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload totalResults={1100} exportType={CSVExportTypes.PROJECT} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and creates modal on 1k export and close modal`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload totalResults={1100} exportType={CSVExportTypes.PROJECT} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  fireEvent.click(screen.getByTestId(`cancel-modal`))
  expect(container).toMatchSnapshot()
})

it(`renders correctly and creates modal on 1k export and export from modal`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload totalResults={1100} exportType={CSVExportTypes.PROJECT} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  fireEvent.click(screen.getByTestId(`accept-modal`))
  expect(container).toMatchSnapshot()
})

// Create a test for createAndDownload function in CSVDownload.tsx
//window.URL.createObjectUR
const createUrlMock = jest.fn()
const revokeUrlMock = jest.fn()
beforeAll(() => {
  window.URL.createObjectURL = createUrlMock
  window.URL.revokeObjectURL = revokeUrlMock
})
it(`creates a link and downloads`, () => {
  const testData = new Blob([`test,test2`], { type: `text/csv` })
  createAndDownloadCsv(testData, CSVExportFilenames.PROJECT_SEARCH)
  const invisibleLink = screen.getByTestId(`invisible-link`)
  expect(createUrlMock).toHaveBeenCalled()
  expect(revokeUrlMock).toHaveBeenCalled()
  expect(invisibleLink).toBeDefined()
})

afterAll(() => {
  jest.clearAllMocks()
})
