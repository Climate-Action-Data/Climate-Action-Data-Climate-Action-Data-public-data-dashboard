import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnitFilterAndSearch from '@/components/organisms/UnitFilterAndSearch/UnitFilterAndSearch'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`UnitFilterBar renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitFilterAndSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`UnitFilterBar renders correctly and the filter-and-search-trigger was clicked`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitFilterAndSearch />
    </TestOvermindWrapper>,
  )

  await userEvent.click(screen.getByTestId(`filter-and-search-trigger`))
  await userEvent.click(screen.getByTestId(`filter-and-search-trigger`))

  expect(container).toMatchSnapshot()
})
