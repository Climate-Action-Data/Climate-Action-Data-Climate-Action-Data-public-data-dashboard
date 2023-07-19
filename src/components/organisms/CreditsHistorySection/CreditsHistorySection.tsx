import { FC, useEffect, useState } from 'react'
import { Card, Grid, GridItem, HStack, Stack, StackDivider, Tag, useBreakpointValue, Wrap, WrapItem } from '@chakra-ui/react'

import { Regions } from '@/@types/Region'
import { useTranslation } from 'react-i18next'
import { Timeframes } from '@/@types/Timeframe'
import ContinentFilter from '@/components/molecules/ContinentFilter/ContinentFilter'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'
import { useActions } from '@/overmind'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'
import { Aeonik } from '@/styles/theme/fonts'

const CreditsHistorySection: FC = () => {
  const [region, setRegion] = useState<string | undefined>(undefined)
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
              <ContinentFilter region={region} clearRegion={() => setRegion(undefined)} />
            </GridItem>
            <GridItem area={`continents-filter`} alignSelf={`center`}>
              <HStack padding={`4px 16px`} gap={`8px`}>
                <Wrap>
                  {Regions.map(
                    (regionName, idx) =>
                      regionName != region && (
                        <WrapItem key={idx}>
                          <Tag
                            className={Aeonik.className}
                            sx={{ color: `charcoal.800`, backgroundColor: `transparent`, cursor: `pointer`, borderRadius: `32px`, padding: `6px 12px` }}
                            onClick={() => setRegion(regionName)}
                          >
                            {t(`regions.${regionName}`)}
                          </Tag>
                        </WrapItem>
                      ),
                  )}
                </Wrap>
              </HStack>
            </GridItem>
            <GridItem area={`date-range-filter`}>
              <HStack padding={`4px 16px`} gap={`8px`}>
                {Object.values(Timeframes).map(
                  (timeframe, idx) =>
                    timeframe != region && (
                      <Tag
                        className={Aeonik.className}
                        sx={{ color: `charcoal.800`, backgroundColor: `transparent`, cursor: `pointer`, borderRadius: `32px`, padding: `6px 12px` }}
                        key={idx}
                      >
                        {timeframe.toUpperCase()}
                      </Tag>
                    ),
                )}
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
