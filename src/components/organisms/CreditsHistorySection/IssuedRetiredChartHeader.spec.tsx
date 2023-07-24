import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import IssuedRetiredChartHeader from '@/components/organisms/CreditsHistorySection/IssuedRetiredChartHeader'

test(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <IssuedRetiredChartHeader autocompleteItems={[]} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
