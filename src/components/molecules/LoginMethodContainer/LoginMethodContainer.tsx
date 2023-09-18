import { HStack, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface LoginMethodContainerProps {
  icon: ReactElement
  text: string
}

const LoginMethodContainer = (props: LoginMethodContainerProps) => {
  const { icon, text } = props
  return (
    <HStack width="288px" height="56px" px="24px" py="16px" borderRadius="32px" bgColor="lightGray.200" spacing="12px">
      {icon}
      <Text fontSize="md" fontWeight="500">
        {text}
      </Text>
    </HStack>
  )
}

export default LoginMethodContainer
