import { FC, useEffect } from 'react'
import { Card, Center, Grid, GridItem, HStack, Stack, StackDivider, useBreakpointValue } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { TimeframesData } from '@/@types/Timeframe'
import { useActions, useAppState } from '@/overmind'
import SubregionIndicator from '@/components/atoms/SubregionIndicator/SubregionIndicator'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'
import { SubRegion } from '@/@types/geojson'
import { AutoComplete } from '@/components/molecules/AutoComplete/AutoComplete'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'
import { Aeonik } from '@/styles/theme/fonts'

const CreditsHistorySection: FC = () => {
  const { getCreditsHistory, setCountry, setSubRegion, setTimeframe } = useActions().creditsHistory
  const { filteredCreditsHistory, dataFilters } = useAppState().creditsHistory
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)
  const statsLayout = useBreakpointValue({
    base: {
      templateAreas: `'chart''stats'`,
      gridTemplateRows: `1fr`,
    },
    md: {
      templateAreas: `'stats chart'`,
      gridTemplateColumns: `1fr 3fr`,
      alignItems: `center`,
    },
  })

  useEffect(() => {
    if (!filteredCreditsHistory) {
      getCreditsHistory()
    }
  }, [])

  const getSearchItems = (
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

  const getCountryPlaceholder = (country: string | undefined): string => {
    if (country) {
      return countryTranslate(`${country}`)
    }
    return t(`regions.chooseCountry`)
  }

  return (
    <Card padding={`24px`} variant={`elevated`}>
      <Grid
        id={`issued-retired-chart`}
        h={`min-content`}
        templateAreas={`
          'filter'
          'data'
        `}
      >
        <GridItem area={`filter`}>
          <Grid
            id={`issued-retired-chart-header`}
            templateAreas={`
              'title continents-filter'
              'date-range-filter date-range-filter'
            `}
            gridTemplateColumns={`auto 1fr`}
            rowGap={`16px`}
            alignItems={`center`}
          >
            <GridItem area={`title`} borderRight={`1px`} borderRightColor={`charcoal.500`} padding={`8px 16px `}>
              <SubregionIndicator subregion={dataFilters?.region} clearSubregion={() => setSubRegion(SubRegion.WORLD)} />
            </GridItem>
            <GridItem area={`continents-filter`} alignSelf={`center`} padding={`4px `}>
              <HStack padding={`4px 16px`} gap={`8px`} alignContent={`baseline`}>
                {dataFilters.region === SubRegion.WORLD ? (
                  <AutoComplete
                    onItemClick={(region) => setSubRegion(region.value)}
                    onItemHover={(_) => undefined}
                    onDropDownLeave={() => undefined}
                    items={getSearchItems(dataFilters.region)}
                    placeholder={t(`regions.chooseRegion`)}
                  />
                ) : (
                  <AutoComplete
                    onItemClick={(country) => setCountry(country.value)}
                    onItemHover={(_) => undefined}
                    onDropDownLeave={() => undefined}
                    items={getSearchItems(dataFilters.region)}
                    placeholder={getCountryPlaceholder(dataFilters.country)}
                  />
                )}
              </HStack>
            </GridItem>
            <GridItem area={`date-range-filter`}>
              <HStack padding={`4px 16px`} gap={`8px`}>
                {Object.values(TimeframesData).map((timeframe, idx) => (
                  <SelectableChip
                    isSelected={dataFilters.timeframe === timeframe}
                    key={idx}
                    label={t(`timeframes.${timeframe}`)}
                    onClick={() => setTimeframe(dataFilters.timeframe === timeframe ? TimeframesData.MAX : timeframe)}
                  />
                ))}
              </HStack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area={`data`}>
          {filteredCreditsHistory ? (
            filteredCreditsHistory?.chartData[0].data?.length > 0 || filteredCreditsHistory?.chartData[1].data.length > 0 ? (
              <Grid id={`issued-retired-chart-header`} {...statsLayout}>
                <GridItem area={`stats`}>
                  <Stack direction={[`row`, null, `column`]} divider={<StackDivider borderBottomColor={`charcoal.500`} borderBottomWidth={`1px`} />}>
                    <CreditsHistoryStat amount={filteredCreditsHistory?.issued} label={`Issued`} textColor={`green.600`} />
                    <CreditsHistoryStat amount={filteredCreditsHistory?.retired} label={`Retired`} textColor={`green.800`} />
                  </Stack>
                </GridItem>
                <GridItem area={`chart`} height={`300px`} minW={0}>
                  <CreditsHistoryChart />
                </GridItem>
              </Grid>
            ) : (
              <Center className={Aeonik.className} height={`200px`} width={`100%`} color={`lightGray.600`} textAlign={`center`}>
                {t(`selectedDataNotAvailable`)}
              </Center>
            )
          ) : (
            <Center height={`200px`} width={`100%`}>
              Notloaded
            </Center>
          )}
        </GridItem>
      </Grid>
    </Card>
  )
}

export default CreditsHistorySection
