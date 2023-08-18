import { render, screen, fireEvent } from '@testing-library/react'
import { UnitSearchBodyHeader } from './UnitSearchBodyHeader'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitSearchBodyHeader />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with projects and handles sort asc`, () => {
  const mockRefresh = jest.fn()
  const { container } = render(
    <TestOvermindWrapper>
      <UnitSearchBodyHeader refreshData={mockRefresh} />
    </TestOvermindWrapper>,
  )
  const rows = screen.getAllByTestId(`sortAsc`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(mockRefresh).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})

it(`renders correctly with projects and handles sort asc`, () => {
  const mockRefresh = jest.fn()
  const { container } = render(
    <TestOvermindWrapper>
      <UnitSearchBodyHeader refreshData={mockRefresh} />
    </TestOvermindWrapper>,
  )
  const rows = screen.getAllByTestId(`sortDesc`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(mockRefresh).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
