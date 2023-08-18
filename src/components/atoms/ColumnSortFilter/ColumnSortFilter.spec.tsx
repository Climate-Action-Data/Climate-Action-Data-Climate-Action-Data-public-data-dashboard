import { render, screen, fireEvent } from '@testing-library/react'
import { ColumnSortFilter } from './ColumnSortFilter'
import { DatabaseQueryDirection, ProjectSearchSortBy } from '@/@types/ProjectSearchFilterValues'

const click = jest.fn()

it(`renders correctly`, () => {
  const testProps = { value: ProjectSearchSortBy.NAME, direction: DatabaseQueryDirection.ASC }

  const { container } = render(<ColumnSortFilter sortValue={testProps.value} currentValue={testProps.value} currentDirection={testProps.direction} onClick={click} />)

  expect(container).toMatchSnapshot()
})

it(`renders correctly and click asc`, () => {
  const testProps = { value: ProjectSearchSortBy.RELEVANCE, direction: DatabaseQueryDirection.ASC }

  const { container } = render(<ColumnSortFilter sortValue={testProps.value} currentValue={testProps.value} currentDirection={testProps.direction} onClick={click} />)

  const inputElement = screen.getByTestId(`sortAsc`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(click).toHaveBeenCalledWith(testProps.value, testProps.direction)
})

it(`renders correctly and click dsc`, () => {
  const testProps = { value: ProjectSearchSortBy.RELEVANCE, direction: DatabaseQueryDirection.DESC }

  const { container } = render(<ColumnSortFilter sortValue={testProps.value} currentValue={testProps.value} currentDirection={testProps.direction} onClick={click} />)

  const inputElement = screen.getByTestId(`sortDesc`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
  expect(click).toHaveBeenCalledWith(testProps.value, testProps.direction)
})
