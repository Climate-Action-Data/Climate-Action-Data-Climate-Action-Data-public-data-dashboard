'use client'
import { Box, Container, Flex, Hide, Spacer, Text } from '@chakra-ui/react'

import { useActions, useAppState } from '@/overmind'
import { CarbonReductionWidget } from '@/components/molecules/CarbonReductionWidget/CarbonReductionWidget'
import { RegionSearch } from '@/components/molecules/RegionSearch/RegionSearch'
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch/TimeframeSearch'
import GeoMap from '@/components/organisms/GeoMap/GeoMap'
import CreditsHistorySection from '@/components/organisms/CreditsHistorySection/CreditsHistorySection'
import { useTranslation } from 'react-i18next'
import ProjectFilterAndSearch from '@/components/organisms/ProjectFilterAndSearch/ProjectFilterAndSearch'
import UnitFilterAndSearch from '@/components/organisms/UnitFilterAndSearch/UnitFilterAndSearch'
import SearchAndFilter from '@/components/molecules/SearchAndFilter/SearchAndFilter'
import { useEffect } from 'react'

export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics
  const { t } = useTranslation(`home`)
  const dataRepresentedAsOf = t(`dataRepresentedAsOf`)
  const formattedDate = new Date(carbonReduction.carbonMapData?.data?.lastUpdated ?? ``)
  const formattedDateTime = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`
  const { resetSearchFilters } = useActions().searchFilters

  useEffect(() => {
    resetSearchFilters()
  }, [])

  const tabs = [
    {
      title: t(`projectView`),
      content: <ProjectFilterAndSearch />,
    },
    {
      title: t(`unitView`),
      content: <UnitFilterAndSearch />,
    },
  ]

  return (
    <>
      <Box paddingX={`24px`} paddingTop={`24px`}>
        <SearchAndFilter tabs={tabs} />
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
          <Flex padding={0} justifyContent="center" marginX={[`8px`, `24px 0`]}>
            <Hide below="md">
              <Flex maxH="650px" justifyContent="center" alignItems="center" flex={1}>
                <GeoMap width="90%" height="90%" subRegion={carbonReduction.carbonMapDataFilters.region} hasCountryData={carbonReduction.carbonMapHasCountryData}></GeoMap>
              </Flex>
            </Hide>
            <CarbonReductionWidget />
          </Flex>
          <Spacer />
          <Text fontSize="sm" width="100%" paddingRight="5px" marginTop="40px" color={`lightGray.600`} textAlign={`right`}>{`${dataRepresentedAsOf} ${formattedDateTime}`}</Text>
        </Container>
      </Flex>
      <Flex>
        <CreditsHistorySection />
      </Flex>
    </>
  )
}
