'use strict'

import { render, screen, fireEvent } from '@testing-library/react'
import { ColumnSortFilter } from './ColumnSortFilter'

it(`renders correctly`, () => {
  const { container } = render(<ColumnSortFilter />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click asc`, () => {
  const sortAsc = jest.fn()
  const { container } = render(<ColumnSortFilter onSortAsc={() => sortAsc()} />)
  expect(container).toMatchSnapshot()
  const inputElement = screen.getByTestId(`sortAsc`)
  fireEvent.click(inputElement)
  expect(sortAsc).toHaveBeenCalled()
})

it(`renders correctly and click dsc`, () => {
  const sortDesc = jest.fn()
  const { container } = render(<ColumnSortFilter onSortDesc={() => sortDesc()} />)
  expect(container).toMatchSnapshot()
  const inputElement = screen.getByTestId(`sortDesc`)
  fireEvent.click(inputElement)
  expect(sortDesc).toHaveBeenCalled()
})
