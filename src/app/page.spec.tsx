import { render } from '@testing-library/react'
import Home from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { ChakraProvider } from '@chakra-ui/react'

it(`renders correctly`, () => {
  const { container } = render(
    <ChakraProvider>
      <TestOvermindWrapper>
        <Home />
      </TestOvermindWrapper>
    </ChakraProvider>,
  )
  expect(container).toMatchSnapshot()
})
