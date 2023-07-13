import { ImportantText } from "@/components/atoms/ImportantText/ImportantText"
import { useActions, useAppState } from "@/overmind"
import { Box, Flex, Text, Skeleton, Stack, Divider, Center, SkeletonCircle } from "@chakra-ui/react"
import { FC, useEffect } from "react"


export const CarbonReductionWidget: FC = (): React.JSX.Element => {
    const { carbonReduction } = useAppState().analytics
    const { getCarbonReduction } = useActions().analytics
    useEffect(() => {
        getCarbonReduction()
    }, [])

    if (!carbonReduction) {
        return <Box minW={"400px"}>
            <Stack>
                <Center>
                    <Box width={"50%"}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                </Center>
                <Divider marginY={"20px"} />
                <Flex>
                    <Box marginRight={"5px"} flex={1}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                    <Box marginLeft={"5px"} flex={1}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                </Flex>
                <Divider marginY={"20px"} />
                <Skeleton height='20px' />
                <Flex>
                    <SkeletonCircle marginRight={"10px"} size='160' />
                    <Flex flexDirection={"column"} justifyContent={"space-evenly"} flex={1}>
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </Flex>
                </Flex>
                <Divider marginY={"20px"} />
                <Flex>
                    <Box marginRight={"5px"} flex={1}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                    <Box marginLeft={"5px"} flex={1}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                    <Box marginLeft={"5px"} flex={1}>
                        <Skeleton marginBottom={"5px"} height='40px' />
                        <Skeleton height='20px' />
                    </Box>
                </Flex>
            </Stack>
        </Box >
    } else {
        return <Box minW={"400px"}>
            <Stack>
                <Center>
                    <Box textAlign={"center"} width={"50%"}>
                        <ImportantText>{carbonReduction.activeProjects}</ImportantText>
                        <Text>Active Projects</Text>
                    </Box>
                </Center>
                <Divider marginY={"20px"} />
                <Flex textAlign={"center"}>
                    <Box marginRight={"5px"} flex={1}>
                        <Box><ImportantText>{carbonReduction.totalReduction}</ImportantText><Text as="span" fontSize="sm">M MtCO2</Text></Box>
                        <Text fontWeight="500">Total Reduction (YTD)</Text>
                    </Box>
                    <Box marginLeft={"5px"} flex={1}>
                        <Box><ImportantText props={{ color: "green.700" }}>{carbonReduction.annualEstReduction}</ImportantText><Text as="span" fontSize="sm">M MtCO2</Text></Box>
                        <Text fontWeight="500">Annual Est. Reduction</Text>
                    </Box>
                </Flex>
                <Divider marginY={"20px"} />
                <Text textAlign={"center"}>Sector</Text>
                <Flex>
                    <SkeletonCircle marginRight={"10px"} size='160' />
                    <Flex flexDirection={"column"} justifyContent={"space-evenly"} flex={1}>
                        {carbonReduction.sectors.map(sector => (
                            <Box><Text>{sector.value}% {sector.title}</Text></Box>
                        ))}
                    </Flex>
                </Flex>
                <Divider marginY={"20px"} />
                <Text textAlign={"center"}>Standard</Text>
                <Flex alignItems={"center"}>
                    {carbonReduction.standards.map(standard => (
                        <Box textAlign={"center"} marginX={"5px"} flex={1}>
                            <ImportantText>{standard.value}%</ImportantText>
                            <Text>{standard.title}</Text>
                        </Box>
                    ))}
                </Flex>
            </Stack>
        </Box >
    }
}