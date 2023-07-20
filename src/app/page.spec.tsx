import { render } from '@testing-library/react'
import Home from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { ChakraProvider } from '@chakra-ui/react'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
