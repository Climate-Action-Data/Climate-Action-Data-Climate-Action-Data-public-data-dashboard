import React from 'react'
import Logo from './../../../assets/logo.png'
import { Box, Flex, SlideFade, useDisclosure, Image, Center } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { DarkModeSwitch } from "../../atoms/DarkModeSwitch/DarkModeSwitch"
import { usePathname } from 'next/navigation'
import { BookmarkIcon } from '../../atoms/BookmarkIcon/BookmarkIcon'
import { HelpIcon } from '../../atoms/HelpIcon/HelpIcon'
import { HomeIcon } from '../../atoms/HomeIcon/HomeIcon'
import { WebRedirectIcon } from '../../atoms/WebRedirectIcon/WebRedirectIcon'

export const Menu = (): React.JSX.Element => {
    const { isOpen } = useDisclosure()
    const currentPath = usePathname()

    return (
        <Box className="menu">
            <Flex height={"100%"} justifyContent={`space-between`} alignItems={`center`}>
                <Flex alignItems={`center`}>
                    {/* <Button position={`sticky`} top={0} colorScheme="gray" width={`56px`} height={`56px`} backgroundColor={isOpen ? `gray.200` : `gray.500`} onClick={onToggle}>
                        <HamburgerIcon color={`white`} />
                    </Button> */}
                    <Image marginX={`8px`} alt="Logo" height={`32px`} src={Logo.src} />
                </Flex>
                <Box>Public Data Dashboard</Box>
                <Flex alignItems={`center`}>
                    {/* <Button alignSelf={`start`} colorScheme="gray" backgroundColor={`gray.500`} width={`56px`} height={`56px`}>
                        <BellIcon color={`white`} />
                    </Button>
                    <Button color={`white`} backgroundColor={`gray.500`} display={`flex`} height={`56px`} padding={`16px`} alignItems={`center`}>
                        <Text>Hello, Kat</Text>
                        <Image margin={`4px`} width={`20px`} height={`20px`} alt="Portrait" src={Portrait.src} />
                    </Button> */}
                </Flex>
            </Flex>
            <SlideFade in={isOpen} style={{ zIndex: 10, width: `56px` }}>
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
