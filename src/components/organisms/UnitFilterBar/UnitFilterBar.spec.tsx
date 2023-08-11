import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render } from '@testing-library/react'
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
