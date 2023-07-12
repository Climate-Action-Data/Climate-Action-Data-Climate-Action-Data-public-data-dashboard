import { useColorMode, Box } from "@chakra-ui/react"
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

