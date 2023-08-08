import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render } from '@testing-library/react'
import { MockData } from '@/test/TestOvermindMockData'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'

it(`renders correctly with no data`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <UnitFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
