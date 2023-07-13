import { useColorMode, Box } from "@chakra-ui/react"
import { DarkModeSwitchIcon } from "../DarkModeSwitchIcon/DarkModeSwitchIcon"
import { LightModeSwitchIcon } from "../LightModeSwitchIcon/LightModeSwitchIcon"

export const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box
            _hover={{ cursor: "pointer" }}
            onClick={toggleColorMode}>
            {colorMode === "dark"
                ? <DarkModeSwitchIcon />
                : <LightModeSwitchIcon />}
        </Box>
    )
}

