import { Timeframes } from "@/@types/Timeframe"
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel, TagCloseButton } from "@chakra-ui/react"
import { useState } from "react"

export const TimeframeSearch = (): React.JSX.Element => {
    const [timeframe, setTimeframe] = useState<string | undefined>(undefined)
    return (
        <Flex height={"40px"} alignItems={"center"}>
            <HStack spacing={4}>
                {Timeframes.map((timeFrameName) => (
                    <Tag
                        size={"md"}
                        key={timeFrameName}
                        borderRadius='full'
                        _hover={{ cursor: "pointer" }}
                        variant={timeFrameName === timeframe ? "solid" : "outline"}
                        colorScheme='gray'
                    >
                        <TagLabel onClick={() => setTimeframe(timeFrameName)}>
                            {timeFrameName}
                        </TagLabel>
                        {timeFrameName === timeframe &&
                            <TagCloseButton onClick={() => setTimeframe(undefined)} />
                        }
                    </Tag>
                ))}
            </HStack>
        </Flex>
    )
}