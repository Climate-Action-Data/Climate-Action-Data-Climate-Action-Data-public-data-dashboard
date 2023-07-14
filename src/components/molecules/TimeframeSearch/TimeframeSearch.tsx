import { Timeframes } from "@/@types/Timeframe"
import { Flex, HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const TimeframeSearch = (): React.JSX.Element => {
    const [timeframe, setTimeframe] = useState<string | undefined>(undefined)
    const { t } = useTranslation("home");
    return (
        <Flex height={"40px"} alignItems={"center"}>
            <HStack spacing={4}>
                {Object.values(Timeframes).map((timeFrameName, idx) => (
                    <Tag
                        size={"md"}
                        key={timeFrameName}

                        borderRadius='full'
                        _hover={{ cursor: "pointer" }}
                        variant={timeFrameName === timeframe ? "solid" : "outline"}
                        colorScheme='gray'
                    >
                        <TagLabel data-testid={`button-timeframe-${idx}`} onClick={() => setTimeframe(timeFrameName)}>
                            {t(`timeframes.${timeFrameName}`)}
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