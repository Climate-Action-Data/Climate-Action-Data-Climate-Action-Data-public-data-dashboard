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
          </Flex>
          <Flex marginX={`24px`}>
            <Flex maxH="650px" justifyContent="center" alignItems="center" flex={3}>
              <GeoMap width="90%" height="90%" subRegion={carbonReduction?.data?.carbonMapSelectedRegion} hasCountryData={carbonReduction?.data?.carbonMapHasCountryData}></GeoMap>
            </Flex>
            <CarbonReductionWidget />
          </Flex>
        </Container>
      </Flex>
    </>
  )
}
