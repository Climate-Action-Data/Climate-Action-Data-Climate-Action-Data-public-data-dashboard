'use client'
import { Container, Flex, Hide, Spacer } from '@chakra-ui/react'

import { useAppState } from '@/overmind'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
import CreditsHistorySection from '@/components/organisms/CreditsHistorySection/CreditsHistorySection'

export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics

  return (
    <Flex direction={`column`} width={`100%`}>
      <Flex>
        <Container marginTop={`40px`} flex={1} variant="cardSection">
          <Flex justifyContent="space-between" flexWrap="wrap" margin={`8px`} gap={`16px`} alignItems={`center`}>
            <RegionSearch />
            <Hide below="md">
              <Spacer />
            </Hide>
            <TimeframeSearch />
          </Flex>
          <Flex justifyContent="center" marginX={[`8px`, `24px`]}>
            <Hide below="md">
              <Flex maxH="650px" justifyContent="center" alignItems="center" flex={1}>
                <GeoMap width="90%" height="90%" subRegion={carbonReduction.carbonMapDataFilters.region} hasCountryData={carbonReduction.carbonMapHasCountryData}></GeoMap>
              </Flex>
            </Hide>
            <CarbonReductionWidget />
          </Flex>
        </Container>
      </Flex>
      <Flex>
        <CreditsHistorySection />
      </Flex>
    </Flex>
  )
}
