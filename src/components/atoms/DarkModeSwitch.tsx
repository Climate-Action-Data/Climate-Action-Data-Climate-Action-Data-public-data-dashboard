import { useColorMode, Box, IconButton } from "@chakra-ui/react"
import { LightModeIcon } from "./LightModeIcon"
import { DarkModeIcon } from "./DarkModeIcon"
import { DarkModeSwitchIcon } from "./DarkModeSwitchIcon"
import { LightModeSwitchIcon } from "./LightModeSwitchIcon copy"

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

