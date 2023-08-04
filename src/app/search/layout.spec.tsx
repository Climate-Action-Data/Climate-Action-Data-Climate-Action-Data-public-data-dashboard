import { render } from '@testing-library/react'
import layout from './layout'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(layout({ children: <>test</> }))
  expect(container).toMatchSnapshot()
})
