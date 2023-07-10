import { defineStyle } from "@chakra-ui/react";

export const brandPrimary = defineStyle({
    background: 'gray.300',
    color: 'white',
    height: "56px",
    width: "56px",
    borderRadius: "8px",
    _hover: {
        background: 'gray.200',
    },
    _active: {
        background: "gray.200"
    },

    // let's also provide dark mode alternatives
    _dark: {
        background: 'gray.500',
        color: 'white',
    }
})