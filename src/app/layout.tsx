'use client'
import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { usePathname } from 'next/navigation'
import { Auth0Provider } from '@auth0/auth0-react'

import { config } from '@/overmind'
import { getAuthConfig } from '../auth-config'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import { Menu } from '@/components/organisms/Menu/Menu'
import theme from '@/styles/Theme'
import NoSSR from './noSSR'

import '../i18n'
import './globals.css'

const authConfig = getAuthConfig()

const onRedirectCallback = (appState: any) => {
  // TODO: Redirect to the correct place
}

const providerConfig = {
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(authConfig.audience ? { audience: authConfig.audience } : null),
  },
}

const overmind = createOvermind(config)
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const currentPath = usePathname()
  return (
    <Provider value={overmind}>
      <Auth0Provider {...providerConfig}>
        <html lang="en">
          <body>
            <NoSSR>
              <CacheProvider>
                <ChakraProvider theme={theme}>
                  {currentPath === `/` && <AppHeader />}
                  <Menu />
                  <Box paddingBottom="60px">{children}</Box>
                </ChakraProvider>
              </CacheProvider>
            </NoSSR>
          </body>
        </html>
      </Auth0Provider>
    </Provider>
  )
}
