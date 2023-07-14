'use client'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch.tsx/TimeframeSearch'
import { Flex, Container, Spacer } from '@chakra-ui/react'

export default function Home(): React.JSX.Element {
  return (
    <>
      <Flex width={`100%`}>
        <Container marginTop={`40px`} flex={1} variant="cardSection">
          <Flex margin={`24px`} alignItems={`center`}>
            <RegionSearch />
            <Spacer />
            <TimeframeSearch />
          </Flex>
          <Flex marginX={`24px`}>my data</Flex>
        </Container>
      </Flex>
    </>
  )
}
