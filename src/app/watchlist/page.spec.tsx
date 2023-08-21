import { render } from '@testing-library/react'
import WatchlistPage from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <WatchlistPage />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
