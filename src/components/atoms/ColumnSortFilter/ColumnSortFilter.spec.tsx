import { render, screen, fireEvent } from '@testing-library/react'
import { ColumnSortFilter } from './ColumnSortFilter'

it(`renders correctly`, () => {
  const { container } = render(<ColumnSortFilter />)

  expect(container).toMatchSnapshot()
})

it(`renders correctly and click asc`, () => {
  const sortAsc = jest.fn()

  const { container } = render(<ColumnSortFilter onSortAsc={() => sortAsc()} />)

  const inputElement = screen.getByTestId(`sortAsc`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(sortAsc).toHaveBeenCalled()
})

it(`renders correctly and click dsc`, () => {
  const sortDesc = jest.fn()

  const { container } = render(<ColumnSortFilter onSortDesc={() => sortDesc()} />)

  const inputElement = screen.getByTestId(`sortDesc`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(sortDesc).toHaveBeenCalled()
})
