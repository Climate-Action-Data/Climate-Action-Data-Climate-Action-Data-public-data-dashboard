import { Regions } from "@/@types/Region"
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel } from "@chakra-ui/react"
import { useState } from "react"


export const RegionSearch = (): React.JSX.Element => {
    const [region, setRegion] = useState<string | undefined>(undefined)
    const regionTitle = () => {
        if (region) {
            return (<Flex alignItems={"center"}>
                <Button borderRadius={"50%"} backgroundColor={"transparent"} onClick={() => setRegion(undefined)}>&lt;</Button>
                <Text fontWeight={"bold"}>{region}</Text>
            </Flex>)
        } else {
            return <Box><Text fontWeight={"bold"}>Region</Text></Box>
        }
    }
    return (
        <Flex height={"40px"} alignItems={"center"}>
            {regionTitle()}
            <Divider marginX={6} height={"70%"} orientation="vertical" />
            <HStack spacing={4}>
                {Regions.map((regionName) => (regionName !== region &&
                    <Button key={regionName} variant={"unstyled"} onClick={() => setRegion(regionName)}>
                        <Tag
                            size={"md"}
                            borderRadius='full'
                            variant='solid'
                            colorScheme='gray'
                        >
                            <TagLabel>{regionName}</TagLabel>
                        </Tag>
                    </Button>

                ))}
            </HStack>
        </Flex>
    )
}