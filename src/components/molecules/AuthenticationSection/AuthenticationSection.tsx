import { Avatar, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAuth0 } from '@auth0/auth0-react'
import { FC, useEffect } from 'react'
import { ProfileIcon } from '@/components/atoms/ProfileIcon/ProfileIcon'
import { WatchlistsIcon } from '@/components/atoms/WatchlistsIcon/WatchlistsIcon'

const AuthenticationSection: FC = (props) => {
  const { t } = useTranslation(`menu`)
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        console.log(token)
      })
    }
  }, [isAuthenticated])

  const handleLoginClick = () => {
    loginWithRedirect()
  }

  const handleLogoutClick = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  if (!isAuthenticated) {
    return (
      <HStack padding={4}>
        <Text onClick={handleLoginClick} _hover={{ cursor: `pointer`, color: `lightGray.300` }}>
          Login
        </Text>
      </HStack>
    )
  }

  return (
    <HStack padding={4} verticalAlign="middle">
      <Menu variant="menuDark">
        <MenuButton>
          {t(`hello`)} {user?.name}
        </MenuButton>
        <MenuList>
          <MenuItem icon={<ProfileIcon />}>{t(`profile`)}</MenuItem>
          <MenuItem icon={<WatchlistsIcon />}>{t(`watchlists`)}</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogoutClick}>{t(`logout`)}</MenuItem>
        </MenuList>
      </Menu>
      <Avatar size="xs" name={user?.name} src={user?.picture} />
    </HStack>
  )
}

export default AuthenticationSection
