import { Flex, Box, Text } from "@chakra-ui/react"
import { ImportantText } from "../ImportantText/ImportantText"

interface CarbonReductionStandardProps {
    vcs: number,
    gcc: number,
    eco: number
}

export const CarbonReductionStandard = ({ vcs, gcc, eco }: CarbonReductionStandardProps): React.JSX.Element => {
    return <Flex alignItems={"center"} marginBottom={4}>
        <Box textAlign={"center"} marginX={"5px"} flex={1}>
            <ImportantText>{vcs}%</ImportantText>
            <Text>VCS</Text>
        </Box>
        <Box textAlign={"center"} marginX={"5px"} flex={1}>
            <ImportantText props={{ color: "green.700" }} >{gcc}%</ImportantText>
            <Text>GCC</Text>
        </Box>
        <Box textAlign={"center"} marginX={"5px"} flex={1}>
            <ImportantText props={{ color: "green.800" }}>{eco}%</ImportantText>
            <Text>ECO</Text>
        </Box>
    </Flex>
}