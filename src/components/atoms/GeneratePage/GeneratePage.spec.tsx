import { fireEvent, render, screen } from '@testing-library/react'
import { GeneratePage } from './GeneratePage'

const DEFAULT_CURRENT_PAGE = 1
const DEFAULT_TOTAL_PAGES = 6
const DEFAULT_TOTAL_PAGES_XS = 2

it(`renders correctly`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<GeneratePage currentPage={DEFAULT_CURRENT_PAGE} totalPages={DEFAULT_TOTAL_PAGES} onPageClick={(page) => onPageChange(page)} />)

  expect(container).toMatchSnapshot()
})

it(`renders correctly with xs pages`, () => {
  const onPageChange = jest.fn()

  const { container } = render(<GeneratePage currentPage={DEFAULT_CURRENT_PAGE} totalPages={DEFAULT_TOTAL_PAGES_XS} onPageClick={(page) => onPageChange(page)} />)

  expect(container).toMatchSnapshot()
})

it(`renders correctly with xs pages and click`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<GeneratePage currentPage={DEFAULT_CURRENT_PAGE} totalPages={DEFAULT_TOTAL_PAGES_XS} onPageClick={(page) => onPageChange(page)} />)

  const inputElement = screen.getByText(`${DEFAULT_CURRENT_PAGE + 1}`)
  fireEvent.click(inputElement)

  expect(onPageChange).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click next`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<GeneratePage currentPage={DEFAULT_CURRENT_PAGE} totalPages={DEFAULT_TOTAL_PAGES} onPageClick={(page) => onPageChange(page)} />)

  const inputElement = screen.getByText(`1`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(onPageChange).toHaveBeenCalled()
})

it(`renders correctly and click down from max`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<GeneratePage currentPage={DEFAULT_TOTAL_PAGES} totalPages={DEFAULT_TOTAL_PAGES} onPageClick={(page) => onPageChange(page)} />)

  const inputElement = screen.getByText(`${DEFAULT_TOTAL_PAGES - 1}`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(onPageChange).toHaveBeenCalled()
})

it(`renders correctly and click first page`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<GeneratePage currentPage={DEFAULT_TOTAL_PAGES} totalPages={DEFAULT_TOTAL_PAGES} onPageClick={(page) => onPageChange(page)} />)

  const inputElement = screen.getByText(`1`)
  fireEvent.click(inputElement)

  expect(onPageChange).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
