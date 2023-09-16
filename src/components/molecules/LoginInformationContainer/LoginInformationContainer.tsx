import { Container, HStack, Button, Box, Text } from '@chakra-ui/react'
import { DetailWidget } from '../../atoms/DetailWidget/DetailWidget'
import { useTranslation } from 'react-i18next'

interface LoginInformationContainerProps {
  id?: string
}

const LoginInformationContainer = (props: LoginInformationContainerProps) => {
  const { t } = useTranslation(`profile`)

  return (
    <Container flex={2} gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
      <HStack alignItems="center">
        <DetailWidget title={t(`password`)}>•••••••••••</DetailWidget>
        <Button data-testid="edit-password-button" ml="88px" variant={`blueOutline`} width={`92px`}>
          {t(`edit`)}
        </Button>
      </HStack>
      <Box mt={`32px`}>
        <Text>Current Login Method</Text>
      </Box>
    </Container>
  )
}

export default LoginInformationContainer
