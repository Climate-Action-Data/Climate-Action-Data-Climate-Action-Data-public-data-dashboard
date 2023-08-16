import { render, screen, fireEvent } from '@testing-library/react'
import { CSVDownload } from './CSVDownload'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { CSVExportTypes } from '@/@types/CSV'

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
