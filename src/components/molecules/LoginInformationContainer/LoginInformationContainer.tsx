import { Container, HStack, Button, Box, Text } from '@chakra-ui/react'
import { DetailWidget } from '../../atoms/DetailWidget/DetailWidget'
import { useTranslation } from 'react-i18next'
import LoginMethodContainer from '../LoginMethodContainer/LoginMethodContainer'
import { LinkedInIcon } from '../../atoms/LinkedInIcon/LinkedInIcon'
import { GoogleIcon } from '../../atoms/GoogleIcon/GoogleIcon'
import { ProfileIcon } from '../../atoms/ProfileIcon/ProfileIcon'

interface LoginInformationContainerProps {
  id: string
}

const LoginInformationContainer = (props: LoginInformationContainerProps) => {
  const { t } = useTranslation(`profile`)

  const { id } = props

  const buildLoginMethod = () => {
    console.log(id)
    if (id.startsWith(`linkedin|`)) {
      return <LoginMethodContainer icon={<LinkedInIcon />} text="LinkedIn" />
    }

    if (id.startsWith(`google|`)) {
      return <LoginMethodContainer icon={<GoogleIcon />} text="Google" />
    }

    return <LoginMethodContainer icon={<ProfileIcon />} text="Email" />
  }

  return (
    <Container flex={2} display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
      <HStack alignItems="center">
        <DetailWidget title={t(`password`)}>{t(`passordPlaceHolder`)}</DetailWidget>
        <Button data-testid="edit-password-button" ml="88px" variant={`blueOutline`} width={`92px`}>
          {t(`edit`)}
        </Button>
      </HStack>
      <Box mt={`32px`} borderTop={`1px solid #B8BEC0`} pt="32px">
        <Text fontSize="md" fontWeight="500" mb="16px">
          Current Login Method
        </Text>
        {buildLoginMethod()}
      </Box>
    </Container>
  )
}

export default LoginInformationContainer
