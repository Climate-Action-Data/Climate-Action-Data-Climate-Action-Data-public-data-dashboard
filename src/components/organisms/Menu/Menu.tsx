import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { Box, Center, Flex, Image, SlideFade, useDisclosure } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

import { DarkModeSwitch } from '@/components/atoms/DarkModeSwitch/DarkModeSwitch'
import { BookmarkIcon } from '@/components/atoms/BookmarkIcon/BookmarkIcon'
import { HelpIcon } from '@/components/atoms/HelpIcon/HelpIcon'
import { HomeIcon } from '@/components/atoms/HomeIcon/HomeIcon'
import { WebRedirectIcon } from '@/components/atoms/WebRedirectIcon/WebRedirectIcon'

import Logo from './../../../assets/logo.png'
import AuthenticationSection from '@/components/molecules/AuthenticationSection/AuthenticationSection'

export const Menu = (): React.JSX.Element => {
  const { isOpen } = useDisclosure()
  const currentPath = usePathname()
  const { t } = useTranslation(`menu`)

  return (
    <Box className="menu">
      <Flex height={`100%`} justifyContent={`space-between`} alignItems={`center`}>
        <Flex alignItems={`center`}>
          {/* <Button position={`sticky`} top={0} colorScheme="gray" width={`56px`} height={`56px`} backgroundColor={isOpen ? `gray.200` : `gray.500`} onClick={onToggle}>
                        <HamburgerIcon color={`white`} />
                    </Button> */}
          <Link href="/">
            <Image marginX={`8px`} alt={t(`logo`)} height={`32px`} src={Logo.src} />
          </Link>
        </Flex>
        <Box flex={1} textAlign="center">
          {t(`title`)}
        </Box>
        <Flex alignItems={`center`}>
          <AuthenticationSection />
        </Flex>
      </Flex>
      <SlideFade in={isOpen} style={{ display: `none`, zIndex: 10, width: `56px` }}>
        <Box color={`white`} backgroundColor={`gray.400`} width={`56px`} height={`100vh`} position={`relative`}>
          <Flex>
            <Link data-testid="button-home" as={`button`} variant={`brandPrimary`} href={`/`}>
              <Center width={`100%`} height={`100%`}>
                <HomeIcon color={currentPath === `/` ? `green.main` : `white`} />
              </Center>
            </Link>
          </Flex>
          <Flex>
            <Link data-testid="button-bookmark" as={`button`} variant={`brandPrimary`} href={`/bookmark`}>
              <Center width={`100%`} height={`100%`}>
                <BookmarkIcon color={currentPath === `/bookmark` ? `green.main` : `white`} />
              </Center>
            </Link>
          </Flex>
          <Flex>
            <Link data-testid="button-redirect" as={`button`} variant={`brandPrimary`} href={`https://www.google.com`}>
              <Center width={`100%`} height={`100%`}>
                <WebRedirectIcon color={`white`} />
              </Center>
            </Link>
          </Flex>
          <Flex>
            <Link data-testid="button-help" as={`button`} variant={`brandPrimary`} href={`/help`}>
              <Center width={`100%`} height={`100%`}>
                <HelpIcon color={currentPath === `/help` ? `green.main` : `white`} />
              </Center>
            </Link>
          </Flex>
          <DarkModeSwitch />
        </Box>
      </SlideFade>
    </Box>
  )
}
