'use client'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
import { useAppState } from '@/overmind'
import { Flex, Container, Spacer } from '@chakra-ui/react'

export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics

  return (
    <>
      <Flex width={`100%`}>
        <Container marginTop={`40px`} flex={1} variant="cardSection">
          <Flex margin={`24px`} alignItems={`center`}>
            <RegionSearch />
            <Spacer />
            <TimeframeSearch />
            <GeoMap width="80vw" height="400px" />
          </Flex>
          <Flex marginX={`24px`}>
            <CarbonReductionWidget />
          </Flex>
        </Container>
      </Flex>
    </>
  )
}
