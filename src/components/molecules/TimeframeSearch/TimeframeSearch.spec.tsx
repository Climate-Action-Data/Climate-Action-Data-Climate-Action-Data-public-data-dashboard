import { render, screen } from '@testing-library/react'
import { TimeframeSearch } from './TimeframeSearch'
import userEvent from '@testing-library/user-event'
import { TestOvermindWrapper } from '@/components/atoms/TestOvermindWrapper/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TimeframeSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders with click on timeframe`, async () => {
  const { container } = await render(
    <TestOvermindWrapper>
      <TimeframeSearch />
    </TestOvermindWrapper>,
  )
  await userEvent.click(screen.getByTestId(`button-timeframe-1`))
  await expect(container).toMatchSnapshot()
})

it(`renders with click on going back`, async () => {
  const { container } = await render(
    <TestOvermindWrapper>
      <TimeframeSearch />
    </TestOvermindWrapper>,
  )
  await userEvent.click(screen.getByTestId(`button-timeframe-1`))
  await userEvent.click(screen.getByTestId(`button-timeframe-close`))
  await expect(container).toMatchSnapshot()
})
