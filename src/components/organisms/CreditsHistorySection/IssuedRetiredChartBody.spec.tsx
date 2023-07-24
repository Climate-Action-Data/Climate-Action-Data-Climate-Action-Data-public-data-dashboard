import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import IssuedRetiredChartBody from '@/components/organisms/CreditsHistorySection/IssuedRetiredChartBody'

test(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <IssuedRetiredChartBody />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
