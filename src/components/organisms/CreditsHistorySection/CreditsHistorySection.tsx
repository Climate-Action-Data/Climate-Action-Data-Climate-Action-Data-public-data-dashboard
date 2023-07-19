import { FC, useEffect, useState } from 'react'
import { Card, Grid, GridItem, HStack, Stack, StackDivider, useBreakpointValue, Wrap, WrapItem } from '@chakra-ui/react'

import { Regions } from '@/@types/Region'
import { useTranslation } from 'react-i18next'
import { Timeframes } from '@/@types/Timeframe'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'
import { useActions } from '@/overmind'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'
import SubregionIndicator from '@/components/atoms/SubregionIndicator/SubregionIndicator'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'

const CreditsHistorySection: FC = () => {
  const [region, setRegion] = useState<string | undefined>(undefined)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string | undefined>(undefined)
  const { creditsHistory: action } = useActions()
  const { t } = useTranslation(`home`)
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
    action.getCreditsHistory()
  })

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
          >
            <GridItem area={`title`} borderRight={`1px`} borderRightColor={`charcoal.500`} padding={`8px 16px `}>
              <SubregionIndicator subregion={region} clearSubregion={() => setRegion(undefined)} />
            </GridItem>
            <GridItem area={`continents-filter`} alignSelf={`center`} padding={`4px `}>
              <HStack padding={`4px 16px`} gap={`8px`} alignContent={`baseline`}>
                <Wrap>
                  {Regions.map(
                    (regionName, idx) =>
                      regionName != region && (
                        <WrapItem key={idx}>
                          <SelectableChip label={t(`regions.${regionName}`)} onClick={() => setRegion(regionName)} />
                        </WrapItem>
                      ),
                  )}
                </Wrap>
              </HStack>
            </GridItem>
            <GridItem area={`date-range-filter`}>
              <HStack padding={`4px 16px`} gap={`8px`}>
                {Object.values(Timeframes).map((timeframe, idx) => (
                  <SelectableChip
                    isSelected={selectedTimeFrame == timeframe}
                    key={idx}
                    label={timeframe.toUpperCase()}
                    onClick={() => setSelectedTimeFrame(selectedTimeFrame == timeframe ? undefined : timeframe)}
                  />
                ))}
              </HStack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area={`data`}>
          <Grid id={`issued-retired-chart-header`} {...statsLayout}>
            <GridItem area={`stats`}>
              <Stack direction={[`row`, null, `column`]} divider={<StackDivider borderBottomColor={`charcoal.500`} borderBottomWidth={`1px`} />}>
                <CreditsHistoryStat amount={7960000} label={`Issued`} textColor={`green.600`} />
                <CreditsHistoryStat amount={4650000} label={`Retired`} textColor={`green.800`} />
              </Stack>
            </GridItem>
            <GridItem area={`chart`} height={`300px`} minW={0}>
              <CreditsHistoryChart />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Card>
  )
}

export default CreditsHistorySection
