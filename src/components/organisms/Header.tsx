import { Box, Image } from "@chakra-ui/react"
import { Menu } from "./Menu"
import headerBanner from "./../../assets/header.jpg"
import { Link } from '@chakra-ui/next-js'



export const Header = (): React.JSX.Element => {
    return (
        <Box>
            <Image src={headerBanner.src} />
            <Link href='/test' color='blue.400' _hover={{ color: 'blue.500' }}>
                About
            </Link>
        </Box>
    )
}