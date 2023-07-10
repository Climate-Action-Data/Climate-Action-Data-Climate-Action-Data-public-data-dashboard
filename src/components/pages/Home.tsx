import { Flex, Container } from '@chakra-ui/react'
import { NextPage } from 'next'
import { RegionSearch } from '../molecules/RegionSearch'
import { TimeframeSearch } from '../molecules/TimeframeSearch'
export const Home: NextPage = () => {
  return (
    <Flex>
      <Container marginTop={`40px`} flex={1} variant="cardSection">
        <RegionSearch />
        <TimeframeSearch />
        test
      </Container>
    </Flex>
  )
}
