import { render } from '@testing-library/react'
import WatchlistViewPage from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistViewPage />
      </TestRouter>
    </TestOvermindWrapper>,
  )

  expect(container).toMatchSnapshot()
})
