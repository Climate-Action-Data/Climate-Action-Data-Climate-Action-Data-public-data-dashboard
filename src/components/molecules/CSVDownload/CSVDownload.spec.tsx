import { render, screen, fireEvent } from '@testing-library/react'
import { CSVDownload } from './CSVDownload'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { CSVExportTypes } from '@/@types/CSV'

const DEFAULT_PATTERN_EMPTY = ``
const DEFAULT_PATTERN = `solar`

it(`renders correctly with no pattern`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.PROJECT} pattern={DEFAULT_PATTERN_EMPTY} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with pattern`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.PROJECT} pattern={DEFAULT_PATTERN} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with pattern no project`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.UNIT} pattern={DEFAULT_PATTERN} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with pattern no project and click`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.UNIT} pattern={DEFAULT_PATTERN} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  expect(container).toMatchSnapshot()
})
it(`renders correctly with pattern as project and click`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CSVDownload exportType={CSVExportTypes.PROJECT} pattern={DEFAULT_PATTERN} />
    </TestOvermindWrapper>,
  )
  const downloadButton = screen.getByTestId(`export-data`)
  fireEvent.click(downloadButton)
  expect(container).toMatchSnapshot()
})
