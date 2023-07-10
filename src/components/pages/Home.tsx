import { Flex, Container, Spacer } from "@chakra-ui/react";
import { NextPage } from "next";
import { RegionSearch } from "../molecules/RegionSearch";


export const Home: NextPage = () => {
    return (
        <Flex>
            <Container marginTop={"40px"} flex={1} variant="cardSection" >
                <RegionSearch />
                test
            </Container>
        </Flex>
    )
}