import { render, screen, fireEvent } from '@testing-library/react'
import { PaginationWidget } from './PaginationWidget'

const DEFAULT_RESULT_PER_PAGE = 15
const DEFAULT_TOTAL_RESULTS = 89

it(`renders correctly`, () => {
  const { container } = render(<PaginationWidget totalResults={DEFAULT_TOTAL_RESULTS} resultPerPage={DEFAULT_RESULT_PER_PAGE} />)

  expect(container).toMatchSnapshot()
})

it(`renders correctly and click asc`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<PaginationWidget onPageChange={(page) => onPageChange(page)} totalResults={DEFAULT_TOTAL_RESULTS} resultPerPage={DEFAULT_RESULT_PER_PAGE} />)

  const inputElement = screen.getByTestId(`pagination-page-down`)
  fireEvent.click(inputElement)

  expect(onPageChange).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click asc`, () => {
  const onPageChange = jest.fn()
  const { container } = render(<PaginationWidget onPageChange={(page) => onPageChange(page)} totalResults={DEFAULT_TOTAL_RESULTS} resultPerPage={DEFAULT_RESULT_PER_PAGE} />)

  const inputElement = screen.getByTestId(`pagination-page-up`)
  fireEvent.click(inputElement)

  expect(onPageChange).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
