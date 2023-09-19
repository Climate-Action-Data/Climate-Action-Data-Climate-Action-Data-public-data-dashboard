import { Container, HStack, Button, Box, Text } from '@chakra-ui/react'
import { DetailWidget } from '../../atoms/DetailWidget/DetailWidget'
import { useTranslation } from 'react-i18next'
import LoginMethodContainer from '../LoginMethodContainer/LoginMethodContainer'
import { LinkedInIcon } from '../../atoms/LinkedInIcon/LinkedInIcon'
import { GoogleIcon } from '../../atoms/GoogleIcon/GoogleIcon'
import { ProfileIcon } from '../../atoms/ProfileIcon/ProfileIcon'
import { LoginProvider } from '@/@types/UserProfile'

interface LoginInformationContainerProps {
  id: string
  isSocialLogin: boolean
  onResetPasswordClick?: () => void
}

const LoginInformationContainer = (props: LoginInformationContainerProps) => {
  const { t } = useTranslation(`profile`)

  const { id, isSocialLogin, onResetPasswordClick } = props

  const buildLoginMethod = () => {
    if (id.startsWith(LoginProvider.LINKEDIN)) {
      return <LoginMethodContainer icon={<LinkedInIcon />} text={t(`linkedIn`)} />
    }

    if (id.startsWith(LoginProvider.GOOGLE)) {
      return <LoginMethodContainer icon={<GoogleIcon />} text={t(`google`)} />
    }

    return <LoginMethodContainer icon={<ProfileIcon />} text={t(`email`)} />
  }

  return (
    <Container flex={2} display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
      {!isSocialLogin && (
        <HStack alignItems="center" borderBottom={`1px solid #B8BEC0`} pb={`32px`} mb={`32px`}>
          <DetailWidget title={t(`password`)}>{t(`passwordPlaceHolder`)}</DetailWidget>
          <Button onClick={onResetPasswordClick} data-testid="edit-password-button" ml="88px" variant={`blueOutline`} width={`92px`}>
            {t(`edit`)}
          </Button>
        </HStack>
      )}
      <Box>
        <Text fontSize="md" fontWeight="500" mb="16px">
          {t(`currentLoginMethod`)}
        </Text>
        {buildLoginMethod()}
      </Box>
    </Container>
  )
}

export default LoginInformationContainer
