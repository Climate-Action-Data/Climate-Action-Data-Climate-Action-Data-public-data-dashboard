import { useColorMode, Box } from "@chakra-ui/react"
import { DarkModeSwitchIcon } from "../icons/DarkModeSwitchIcon/DarkModeSwitchIcon"
import { LightModeSwitchIcon } from "../icons/LightModeSwitchIcon/LightModeSwitchIcon"

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

