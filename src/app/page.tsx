'use client'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
import { useAppState } from '@/overmind'
import { Flex, Container, Spacer, Hide } from '@chakra-ui/react'

export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics

  return (
    <>
      <Flex width={`100%`}>
        <Container marginTop={`40px`} flex={1} variant="cardSection">
          <Flex justifyContent="space-between" flexWrap="wrap" margin={`24px`} alignItems={`center`}>
            <RegionSearch />
            <Hide below="md">
              <Spacer />
            </Hide>
            <TimeframeSearch />
            <GeoMap width="80vw" height="400px" />
          </Flex>
          <Flex justifyContent="center" marginX={`24px`}>
            <Hide below="md">
              <Flex maxH="650px" justifyContent="center" alignItems="center" flex={3}>
                <GeoMap width="90%" height="90%" subRegion={carbonReduction.carbonMapDataFilters.region} hasCountryData={carbonReduction.carbonMapHasCountryData}></GeoMap>
              </Flex>
            </Hide>
            <CarbonReductionWidget />
          </Flex>
        </Container>
      </Flex>
    </>
  )
}
