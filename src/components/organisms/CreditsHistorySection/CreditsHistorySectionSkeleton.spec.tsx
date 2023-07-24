import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import CreditsHistorySkeleton from '@/components/organisms/CreditsHistorySection/CreditsHistorySectionSkeleton'

test(`renders loading state when creditsHistoryData is undefined`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <CreditsHistorySkeleton />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
