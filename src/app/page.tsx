'use client'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
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
          <Flex marginX={`24px`}>
            <GeoMap width="50vw" height="800px"></GeoMap>
            <CarbonReductionWidget />
          </Flex>
        </Container>
      </Flex>
    </>
  )
}
