import { Flex, Container, Spacer } from "@chakra-ui/react";
import { NextPage } from "next";
import { RegionSearch } from "../molecules/RegionSearch";
import { TimeframeSearch } from "../molecules/TimeframeSearch";


export const Home: NextPage = () => {
    return (
        <Flex>
            <Container marginTop={"40px"} flex={1} variant="cardSection" >
                <Flex margin={"24px"} alignItems={"center"}>
                    <RegionSearch />
                    <Spacer />
                    <TimeframeSearch />
                </Flex>
                <Flex marginX={"24px"}>
                    my data
                </Flex>
            </Container>
        </Flex>
    )
}