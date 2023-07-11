import React from "react"
import hamburgerIcon from "./../../assets/icons/hamburger.svg"
import HomeIcon from "./../../assets/icons/home.svg"
import BookmarkIcon from "./../../assets/icons/bookmark.svg"
import WebRedirectIcon from "./../../assets/icons/web-redirect.svg"
import Logo from "./../../assets/logo.png"
import Portrait from "./../../assets/portrait.png"
import HelpIcon from "./../../assets/icons/help.svg"
import BellIcons from "./../../assets/icons/bell.svg"
import { Button, Box, Text, Flex, SlideFade, useDisclosure, Image, Icon } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js'


export const Menu = (): React.JSX.Element => {
    const { isOpen, onToggle } = useDisclosure()

    const redirect = () => {

    }

    return (
        <Box className="menu">
            <Flex justifyContent={"space-between"} alignItems={"center"} >
                <Flex alignItems={"center"}>
                    <Button position={"sticky"} top={0} colorScheme="gray" width={"56px"} height={"56px"} backgroundColor={(isOpen) ? "gray.200" : "gray.500"} onClick={onToggle}>
                        <Image alt="Menu" src={hamburgerIcon.src} />
                    </Button>
                    <Image marginX={"8px"} alt="Logo" height={"32px"} src={Logo.src} />
                </Flex>
                <Box>Public Data Dashboard</Box>
                <Flex alignItems={"center"}>
                    <Button alignSelf={"start"} colorScheme="gray" backgroundColor={"gray.500"} width={"56px"} height={"56px"}>
                        <Image alt="Menu" src={BellIcons.src} />

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
                            <Image alt="Home" src={HomeIcon.src} />
                        </Link>
                        {/* <Button variant={"brandPrimary"} onClick={redirect}>
                            <Image alt="Home" src={HomeIcon.src} />
                        </Button> */}
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <Image alt="Bookmark" src={BookmarkIcon.src} />
                        </Button>
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <Image alt="Website" src={WebRedirectIcon.src} />
                        </Button>
                    </Flex>
                    <Flex>
                        <Button variant={"brandPrimary"} onClick={redirect}>
                            <Image alt="Help" src={HelpIcon.src} />
                        </Button>
                    </Flex>
                </Box>
            </SlideFade >
        </Box >
    )
}