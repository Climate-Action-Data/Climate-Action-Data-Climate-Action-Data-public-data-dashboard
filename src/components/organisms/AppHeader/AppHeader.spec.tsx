import { render } from '@testing-library/react'
import AppHeader from './AppHeader'
import { ChakraProvider } from '@chakra-ui/react'

Object.defineProperty(window, `matchMedia`, {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

it(`renders correctly`, () => {
  const { container } = render(
    <ChakraProvider>
      <AppHeader />
    </ChakraProvider>,
  )
  expect(container).toMatchSnapshot()
})
