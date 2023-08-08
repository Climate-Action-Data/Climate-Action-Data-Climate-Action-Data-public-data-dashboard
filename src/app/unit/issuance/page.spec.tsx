import { render } from '@testing-library/react'
import IssuancePage from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `id` } }),
  useSearchParams: () => ({ get: () => `id` }),
}))

describe(`IssuancePage`, () => {
  it(`renders correctly`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <IssuancePage />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
