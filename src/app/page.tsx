'use client'
import { Box, Container, Flex, Hide, Spacer, Text } from '@chakra-ui/react'

import { useAppState } from '@/overmind'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
import CreditsHistorySection from '@/components/organisms/CreditsHistorySection/CreditsHistorySection'
import { useTranslation } from 'react-i18next'
import FiltersAndSearch from '@/components/organisms/FiltersAndSearch/FiltersAndSearch'

export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics
  const { t } = useTranslation(`home`)
  const dataRepresentedAsOf = t(`dataRepresentedAsOf`)
  const formattedDate = new Date(carbonReduction.carbonMapData?.data?.lastUpdated ?? ``)
  const formattedDateTime = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`

  return (
    <>
      <Box paddingX={`24px`} paddingTop={`24px`}>
        <FiltersAndSearch />
      </Box>
      <Flex padding={`24px`} minHeight="min-content" alignItems="center" justifyContent="space-between" flexDirection="column" width={`100%`}>
        <Container marginTop={`20px`} variant="cardSection">
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
          <Spacer />
          <Text width="100%" paddingRight="5px" marginTop="40px" color={`lightGray.600`} textAlign={`right`}>{`${dataRepresentedAsOf} ${formattedDateTime}`}</Text>
        </Container>
      </Flex>
      <Flex>
        <CreditsHistorySection />
      </Flex>
    </>
  )
}
