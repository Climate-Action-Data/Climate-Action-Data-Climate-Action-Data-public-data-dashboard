import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render } from '@testing-library/react'
import CreditsHistorySection from '@/components/organisms/CreditsHistorySection/CreditsHistorySection'
import { MockData } from '@/test/TestOvermindMockData'

it(`renders correctly with no data`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CreditsHistorySection />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <CreditsHistorySection />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
