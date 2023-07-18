'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Flex, theme } from '@chakra-ui/react'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '@/overmind'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import NoSSR from './noSSR'
import { Menu } from '@/components/organisms/Menu/Menu'

import '../i18n'

import './globals.css'

const overmind = createOvermind(config, { devtools: `localhost:3001` })

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Provider value={overmind}>
      <html lang="en">
        <body className={inter.className}>
          <NoSSR>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <AppHeader />
                <Menu />
                <Flex padding={{ md: 6 }} minHeight="100vh" alignItems="center" justifyContent="space-between" flexDirection="column">
                  {children}
                </Flex>
              </ChakraProvider>
            </CacheProvider>
          </NoSSR>
        </body>
      </html>
    </Provider>
  )
}
