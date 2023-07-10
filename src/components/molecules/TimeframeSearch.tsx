import { Timeframes } from "@/@types/Timeframe"
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel, TagCloseButton } from "@chakra-ui/react"
import { useState } from "react"

export const TimeframeSearch = (): React.JSX.Element => {
    const [timeframe, setTimeframe] = useState<string | undefined>(undefined)
    return (
        <Flex height={"40px"} alignItems={"center"}>
            <HStack spacing={4}>
                {Timeframes.map((timeFrameName) => (
                    <Button key={timeFrameName} variant={"unstyled"} onClick={() => setTimeframe(timeFrameName)}>
                        <Tag
                            size={"md"}
                            borderRadius='full'
                            variant={timeFrameName === timeframe ? "solid" : "outline"}
                            colorScheme='gray'
                        >
                            <TagLabel>{timeFrameName}</TagLabel>
                            {timeFrameName === timeframe &&
                                <TagCloseButton onClick={() => setTimeframe(undefined)} />
                            }
                        </Tag>

                    </Button>

                ))}
            </HStack>
        </Flex>
    )
}