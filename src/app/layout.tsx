'use client'
import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'

import { config } from '@/overmind'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import { Menu } from '@/components/organisms/Menu/Menu'
import font from '@/styles/Font'
import theme from '@/styles/Theme'
import NoSSR from './noSSR'

import '../i18n'
import './globals.css'
import { usePathname } from 'next/navigation'

const overmind = createOvermind(config)
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const currentPath = usePathname()
  return (
    <Provider value={overmind}>
      <html lang="en">
        <body className={font.className}>
          <NoSSR>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                {currentPath === `/` && <AppHeader />}
                <Menu />
                {children}
              </ChakraProvider>
            </CacheProvider>
          </NoSSR>
        </body>
      </html>
    </Provider>
  )
}
