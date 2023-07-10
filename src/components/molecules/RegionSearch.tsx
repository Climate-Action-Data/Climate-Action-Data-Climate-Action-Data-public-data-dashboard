import { Regions } from "@/@types/Region"
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel } from "@chakra-ui/react"
import { useState } from "react"

export const RegionSearch = (): React.JSX.Element => {
    const [region, setRegion] = useState<string | undefined>(undefined)
    return (
        <Flex height={"40px"} alignItems={"center"}>
            {region
                ? <Flex alignItems={"center"}><Button>&lt;</Button><Text>{region}</Text></Flex>
                : <Box><Text fontWeight={"bold"}>Region</Text></Box>
            }
            <Divider marginX={6} height={"70%"} orientation="vertical" />
            <HStack spacing={4}>
                {Regions.map((region) => (
                    <Button variant={"unstyled"} onClick={() => setRegion(region)}>

                        <Tag
                            size={"md"}
                            key={region}
                            borderRadius='full'
                            variant='solid'
                            colorScheme='gray'
                        >
                            <TagLabel>{region}</TagLabel>
                        </Tag>
                    </Button>

                ))}
            </HStack>
        </Flex>
    )
}