import { fireEvent, render, screen } from '@testing-library/react'
import { SearchHeader } from '@/components/molecules/SearchHeader/SearchHeader'
import userEvent from '@testing-library/user-event'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <SearchHeader />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and clear the search values`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <SearchHeader />
    </TestOvermindWrapper>,
  )
  await userEvent.clear(screen.getByRole(`textbox`))
  expect(container).toMatchSnapshot()
})

it(`renders correctly and clear the search values`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <SearchHeader />
    </TestOvermindWrapper>,
  )
  const input = screen.getByTestId(`search-input-enter`)
  fireEvent.keyDown(input, {
    key: `Enter`,
    code: `Enter`,
    keyCode: 13,
    charCode: 13,
  })
  await userEvent.clear(screen.getByRole(`textbox`))
  expect(container).toMatchSnapshot()
})

jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => undefined }),
}))

const NUMBER_TIMES_ROUTE_CALLED = 2

it(`renders correctly with no params, add a search value and submits a search`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <SearchHeader />
    </TestOvermindWrapper>,
  )
  await userEvent.type(screen.getByRole(`textbox`), `hello`)
  await userEvent.click(screen.getByTestId(`search-header-button`))
  expect(mockPush).toBeCalledTimes(NUMBER_TIMES_ROUTE_CALLED)
  expect(container).toMatchSnapshot()
})
