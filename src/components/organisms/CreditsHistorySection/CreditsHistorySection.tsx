import { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Center, Container, Grid, GridItem } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { SubRegion } from '@/@types/geojson'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import IssuedRetiredChartHeader from '@/components/organisms/CreditsHistorySection/IssuedRetiredChartHeader'
import IssuedRetiredChartBody from '@/components/organisms/CreditsHistorySection/IssuedRetiredChartBody'
import CreditsHistorySkeleton from '@/components/organisms/CreditsHistorySection/CreditsHistorySectionSkeleton'

const CreditsHistorySection: FC = () => {
  const { getCreditsHistory } = useActions().creditsHistory
  const { getCreditsHistory: getCreditsHistoryEffect } = useEffects().creditsHistory
  const { filteredCreditsHistory, dataFilters } = useAppState().creditsHistory
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)
  let ChartBodyComponent

  useEffect(() => {
    if (!filteredCreditsHistory) {
      getCreditsHistoryEffect().then((result) => {
        getCreditsHistory(result)
      })
    }
  }, [])

  const getAutocompleteItems = (
    subRegion: SubRegion,
  ): {
    value: string
    label: string
  }[] => {
    if (subRegion !== SubRegion.WORLD) {
      return generateCountryByRegion(subRegion).map((country) => ({
        value: country,
        label: countryTranslate(`${country}`),
      }))
    } else {
      return Object.values(SubRegion).map((region) => ({
        value: region,
        label: t(`regions.${region}`),
      }))
    }
  }

  if (filteredCreditsHistory) {
    const issuedValues = filteredCreditsHistory?.chartData[0].data?.length
    const retiredValues = filteredCreditsHistory?.chartData[1].data?.length

    if (issuedValues > 0 || retiredValues > 0) {
      ChartBodyComponent = <IssuedRetiredChartBody />
    } else {
      ChartBodyComponent = (
        <Center height={`300px`} width={`100%`} color={`lightGray.600`} textAlign={`center`}>
          {t(`selectedDataNotAvailable`)}
        </Center>
      )
    }
  } else {
    ChartBodyComponent = <CreditsHistorySkeleton />
  }

  const autocompleteItems = useMemo(() => getAutocompleteItems(dataFilters.region), [dataFilters.region])

  return (
    <Container marginTop={`40px`} padding={`24px`} flex={1} variant={`creditHistoryCardSection`}>
      <Grid
        id={`issued-retired-chart`}
        width={`100%`}
        height={`min-content`}
        templateAreas={`
          'filter'
          'data'
        `}
      >
        <GridItem area={`filter`}>
          <IssuedRetiredChartHeader autocompleteItems={autocompleteItems} />
        </GridItem>
        <GridItem area={`data`}>{ChartBodyComponent}</GridItem>
      </Grid>
    </Container>
  )
}

export default CreditsHistorySection
