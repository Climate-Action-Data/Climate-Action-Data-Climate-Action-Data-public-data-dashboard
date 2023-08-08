import { render } from '@testing-library/react'
import PageDetails from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `id` } }),
  useSearchParams: () => ({ get: () => `id` }),
}))

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <PageDetails />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
