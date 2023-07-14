import { Box, Image } from "@chakra-ui/react"
import headerBanner from "./../../assets/header.jpg"



export const Header = (): React.JSX.Element => {
    return (
        <Box>
            <Image src={headerBanner.src} />
        </Box>
    )
}