import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TimeframeSearch } from './TimeframeSearch'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TimeframeSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders with click on timeframe`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TimeframeSearch />
    </TestOvermindWrapper>,
  )
  await userEvent.click(screen.getByTestId(`test-id-1m`))
  expect(container).toMatchSnapshot()
})
