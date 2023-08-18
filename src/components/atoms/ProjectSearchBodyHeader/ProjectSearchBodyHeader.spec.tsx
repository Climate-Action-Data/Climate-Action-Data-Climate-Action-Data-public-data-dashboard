import { fireEvent, render, screen } from '@testing-library/react'
import { ProjectSearchBodyHeader } from './ProjectSearchBodyHeader'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectSearchBodyHeader />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with projects and handles sort asc`, () => {
  const mockRefresh = jest.fn()
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectSearchBodyHeader refreshData={mockRefresh} />
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
      <ProjectSearchBodyHeader refreshData={mockRefresh} />
    </TestOvermindWrapper>,
  )
  const rows = screen.getAllByTestId(`sortDesc`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(mockRefresh).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
