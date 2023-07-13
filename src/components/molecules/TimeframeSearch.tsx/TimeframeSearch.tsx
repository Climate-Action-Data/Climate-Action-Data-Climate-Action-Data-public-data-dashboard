import { Timeframes } from "@/@types/Timeframe"
import { Flex, HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"
import { useState } from "react"

export const TimeframeSearch = (): React.JSX.Element => {
    const [timeframe, setTimeframe] = useState<string | undefined>(undefined)
    return (
        <Flex height={"40px"} alignItems={"center"}>
            <HStack spacing={4}>
                {Timeframes.map((timeFrameName, idx) => (
                    <Tag
                        size={"md"}
                        key={timeFrameName}

                        borderRadius='full'
                        _hover={{ cursor: "pointer" }}
                        variant={timeFrameName === timeframe ? "solid" : "outline"}
                        colorScheme='gray'
                    >
                        <TagLabel data-testid={`button-timeframe-${idx}`} onClick={() => setTimeframe(timeFrameName)}>
                            {timeFrameName}
                        </TagLabel>
                        {timeFrameName === timeframe &&
                            <TagCloseButton data-testid={`button-timeframe-close`} onClick={() => setTimeframe(undefined)} />
                        }
                    </Tag>
                ))}
            </HStack>
        </Flex>
    )
}