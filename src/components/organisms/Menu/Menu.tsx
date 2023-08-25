import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Hide, Image } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import Logo from './../../../assets/logo.png'
import AuthenticationSection from '@/components/molecules/AuthenticationSection/AuthenticationSection'
import { CADIcon } from '@/components/atoms/CADIcon/CADIcon'

export const Menu = (): React.JSX.Element => {
  const { t } = useTranslation(`menu`)

  return (
    <Box className="menu">
      <Flex
        _before={{ zIndex: `-1`, display: [`none`, `flex`], fontSize: `14px`, width: `100%`, position: `absolute`, justifyContent: `center`, content: `"${t(`title`)}"` }}
        height={`100%`}
        justifyContent={`space-between`}
        alignItems={`center`}
      >
        <Flex alignItems={`center`}>
          <Link href="/">
            <Hide below="md">
              <Image marginLeft={`24px`} alt={t(`logo`)} height={`32px`} src={Logo.src} />
            </Hide>
            <Hide above="md">
              <CADIcon marginLeft={`24px`} />
            </Hide>
          </Link>
        </Flex>
        <Flex alignItems={`center`}>
          <AuthenticationSection />
        </Flex>
      </Flex>
    </Box>
  )
}
