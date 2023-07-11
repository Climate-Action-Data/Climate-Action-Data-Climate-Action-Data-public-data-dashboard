import React from "react"
import Logo from "./../../assets/logo.png"
import Portrait from "./../../assets/portrait.png"
import BellIcons from "./../../assets/icons/bell.svg"
import { Button, Box, Text, Flex, SlideFade, useDisclosure, Image, Icon } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js'
import { BellIcon } from "../atoms/BellIcon"
import { BookmarkIcon } from "../atoms/BookmarkIcon"
import { HamburgerIcon } from "../atoms/HamburgerIcon"
import { HelpIcon } from "../atoms/HelpIcon"
import { WebRedirectIcon } from "../atoms/WebRedirectIcon"
import { HomeIcon } from "../atoms/HomeIcon"
import { DarkModeSwitch } from "../atoms/DarkModeSwitch"


export const Menu = (): React.JSX.Element => {
    const { isOpen, onToggle } = useDisclosure()

    const redirect = () => {

    }

    return (
        <Box className="menu">
            <Flex justifyContent={"space-between"} alignItems={"center"} >
                <Flex alignItems={"center"}>
                    <Button position={"sticky"} top={0} colorScheme="gray" width={"56px"} height={"56px"} backgroundColor={(isOpen) ? "gray.200" : "gray.500"} onClick={onToggle}>
                        <HamburgerIcon color={"white"} />
                    </Button>
                    <Image marginX={"8px"} alt="Logo" height={"32px"} src={Logo.src} />
                </Flex>
                <Box>Public Data Dashboard</Box>
                <Flex alignItems={"center"}>
                    <Button alignSelf={"start"} colorScheme="gray" backgroundColor={"gray.500"} width={"56px"} height={"56px"}>
                        <BellIcon color={"white"} />
                    </Button>
                    <Button color={"white"} backgroundColor={"gray.500"} display={"flex"} height={"56px"} padding={"16px"} alignItems={"center"}>
                        <Text>Hello, Kat</Text>
                        <Image margin={"4px"} width={"20px"} height={"20px"} alt="Portrait" src={Portrait.src} />
                    </Button>
                </Flex>
            </Flex>
            <SlideFade in={isOpen} style={{ zIndex: 10, width: "56px" }}>
                <Box color={"white"} backgroundColor={"gray.400"} width={"56px"} height={"100vh"} position={"relative"}>
                    <Flex>
                        <Link as={"button"} variant={"brandPrimary"} href='/'>
                            <HomeIcon color={"white"} />
                        </Link>
                        {/* <Button variant={"brandPrimary"} onClick={redirect}>
                            <Image alt="Home" src={HomeIcon.src} />
                        </Button> */}
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <BookmarkIcon color="white" />
                        </Button>
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <WebRedirectIcon color={"white"} />
                        </Button>
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <HelpIcon color={"white"} />
                        </Button>
                    </Flex>
                    <DarkModeSwitch />
                </Box>
            </SlideFade >
        </Box >
    )
}