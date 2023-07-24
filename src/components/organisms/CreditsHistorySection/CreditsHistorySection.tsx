import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Center, Container, Grid, GridItem, HStack, Skeleton, Stack, StackDivider, Tag, TagCloseButton, TagLabel, Text, VStack } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'

import SubregionIndicator from '@/components/atoms/SubregionIndicator/SubregionIndicator'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'
import { AutoComplete } from '@/components/molecules/AutoComplete/AutoComplete'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'
import { Aeonik } from '@/styles/fonts'

const CreditsHistorySection: FC = () => {
  const { getCreditsHistory, setCountry, setSubRegion, setTimeframe } = useActions().creditsHistory
  const { getCreditsHistory: getCreditsHistoryEffect } = useEffects().creditsHistory
  const { filteredCreditsHistory, dataFilters, rawCreditsHistory } = useAppState().creditsHistory
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)

  useEffect(() => {
    if (!filteredCreditsHistory) {
      getCreditsHistoryEffect().then((result) => {
        getCreditsHistory(result)
      })
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

  const GenerateChartAndStatsSkeleton = () => {
    return (
      <Grid
        id={`issued-retired-chart-header`}
        templateAreas={[`'chart''stats'`, null, `'stats chart'`]}
        gridTemplateRows={[`1fr`]}
        gridTemplateColumns={[`1fr`, null, `1fr 3fr`]}
        alignItems={`center`}
        width={`100%`}
      >
        <GridItem area={`stats`} padding={`10px`}>
          <Stack direction={[`row`, null, `column`]} divider={<StackDivider borderBottomColor={`lightGray.400`} borderBottomWidth={`1px`} />}>
            <VStack width={[`50%`, null, `auto`]}>
              <Skeleton height={[`40px`, null, `64px`]} aspectRatio={2} />
              <Text>{`Issued`}</Text>
            </VStack>
            <VStack width={[`50%`, null, `auto`]}>
              <Skeleton height={[`40px`, null, `64px`]} aspectRatio={2} />
              <Text>{`Retired`}</Text>
            </VStack>
          </Stack>
        </GridItem>
        <GridItem area={`chart`} height={`300px`} minW={0}>
          <Skeleton width={`100%`} height={`300px`} />
        </GridItem>
      </Grid>
    )
  }

  const lastUpdatedDate = new Date(rawCreditsHistory?.data?.lastUpdated ?? ``)

  const getCountryPlaceholder = (country: string | undefined): string => {
    if (country) {
      return countryTranslate(`${country}`)
    }
    return t(`regions.chooseCountry`)
  }

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
            <GridItem area={`title`} borderRight={`1px`} borderRightColor={`lightGray.400`} padding={`8px 16px `}>
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
                {Object.values(TimeframesData).map(
                  (timeframe, idx) =>
                    timeframe !== TimeframesData.MAX && (
                      <Tag
                        size={`md`}
                        key={idx}
                        borderRadius="full"
                        _hover={{ cursor: `pointer` }}
                        variant={dataFilters.timeframe === timeframe ? `solid` : `outline`}
                        colorScheme="gray"
                      >
                        <TagLabel data-testid={`button-timeframe-${idx}`} onClick={() => setTimeframe(timeframe)}>
                          {t(`timeframes.${timeframe}`)}
                        </TagLabel>
                        {dataFilters.timeframe === timeframe && <TagCloseButton data-testid={`button-timeframe-close`} onClick={() => setTimeframe(TimeframesData.MAX)} />}
                      </Tag>
                    ),
                )}
              </HStack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area={`data`}>
          {filteredCreditsHistory ? (
            filteredCreditsHistory?.chartData[0].data?.length > 0 || filteredCreditsHistory?.chartData[1].data.length > 0 ? (
              <VStack alignItems={`end`}>
                <Grid
                  id={`issued-retired-chart-header`}
                  templateAreas={[`'chart''stats'`, null, `'stats chart'`]}
                  gridTemplateRows={[`1fr`]}
                  gridTemplateColumns={[`1fr`, null, `1fr 3fr`]}
                  alignItems={`center`}
                  width={`100%`}
                >
                  <GridItem area={`stats`}>
                    <Stack direction={[`row`, null, `column`]} divider={<StackDivider borderBottomColor={`lightGray.400`} borderBottomWidth={`1px`} />}>
                      <CreditsHistoryStat amount={filteredCreditsHistory?.issued} label={t(`issued`)} textColor={`green.600`} />
                      <CreditsHistoryStat amount={filteredCreditsHistory?.retired} label={t(`retired`)} textColor={`green.800`} />
                    </Stack>
                  </GridItem>
                  <GridItem area={`chart`} height={`300px`} minW={0}>
                    <CreditsHistoryChart />
                    src/overmind/creditsHistory/effects.ts
                  </GridItem>
                </Grid>
                {rawCreditsHistory?.data?.lastUpdated}
                <Text className={Aeonik.className} color={`lightGray.600`}>
                  {`${t(`dataRepresentedAsOf`)} ${lastUpdatedDate.toLocaleDateString()} ${lastUpdatedDate.toLocaleTimeString()}`}
                </Text>
              </VStack>
            ) : (
              <Center className={Aeonik.className} height={`300px`} width={`100%`} color={`lightGray.600`} textAlign={`center`}>
                {t(`selectedDataNotAvailable`)}
              </Center>
            )
          ) : (
            <GenerateChartAndStatsSkeleton />
          )}
        </GridItem>
      </Grid>
    </Container>
  )
}

export default CreditsHistorySection
