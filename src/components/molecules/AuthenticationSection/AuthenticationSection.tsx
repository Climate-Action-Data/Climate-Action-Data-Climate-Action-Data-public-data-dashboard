import { Avatar, HStack, Hide, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAuth0 } from '@auth0/auth0-react'
import { FC, useEffect } from 'react'
import { ProfileIcon } from '@/components/atoms/ProfileIcon/ProfileIcon'
import { WatchlistsIcon } from '@/components/atoms/WatchlistsIcon/WatchlistsIcon'
import { useActions } from '@/overmind'
import { useRouter } from 'next/navigation'

const AuthenticationSection: FC = (props) => {
  const { t } = useTranslation(`menu`)
  const router = useRouter()
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()
  const { setAuthentication, clearAuthentication } = useActions().authentication

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        if (user) {
          setAuthentication({ user, authToken: token })
        }
      })
      .catch(() => {
        clearAuthentication()
      })
  })

  const handleLoginClick = () => {
    loginWithRedirect()
  }

  const handleWatchlistClick = () => {
    router.push(`/watchlist/all`)
  }

  const handleLogoutClick = () => {
    clearAuthentication()
    logout({
      logoutParams: {
        returnTo: process.env.NEXT_PUBLIC_APP_URL,
      },
    })
  }

  if (!isAuthenticated) {
    return (
      <HStack padding={4}>
        <Text onClick={handleLoginClick} _hover={{ cursor: `pointer`, color: `lightGray.300` }}>
          {t(`login`)}
        </Text>
      </HStack>
    )
  }

  return (
    <HStack marginRight="24px" verticalAlign="middle">
      <Menu variant="menuDark">
        <MenuButton>
          <Hide below="sm">
            <Text as="span">
              {t(`hello`)} {user?.name}
            </Text>
          </Hide>
          <Avatar marginLeft="6px" size="xs" name={user?.name} src={user?.picture} />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<ProfileIcon />}>{t(`profile`)}</MenuItem>
          <MenuItem onClick={handleWatchlistClick} icon={<WatchlistsIcon />}>
            {t(`watchlists`)}
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogoutClick}>{t(`logout`)}</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}

export default AuthenticationSection
