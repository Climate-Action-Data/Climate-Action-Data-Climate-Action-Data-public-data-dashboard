import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockData } from '@/test/TestOvermindMockData'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly with no data`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <UnitFilterBar />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <TestRouter router={{}}>
        <UnitFilterBar />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
it(`renders correctly with loaded data and search click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <TestRouter router={{ push }}>
        <UnitFilterBar />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const button = screen.getByTestId(`search-button`)
  fireEvent.click(button)
  expect(container).toMatchSnapshot()
})
