import { Spinner, Flex, Text } from '@chakra-ui/react'

interface SpinnerScreenProps {
  message?: string
}

export const SpinnerScreen = (props: SpinnerScreenProps) => {
  const { message } = props
  return (
    <Flex flex={1} alignItems="center" flexDirection={`column`} justifyContent="center" w="50vw" h="50vh">
      <Spinner thickness="4px" speed="0.95s" emptyColor="green.700" color="green.300" size="xl" />
      {message && <Text>{message}</Text>}
    </Flex>
  )
}
