import { Grid, GridItem, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import CreditsHistoryStat from '@/components/atoms/CreditsHistoryStat/CreditHistoryStat'
import CreditsHistoryChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryChart'
import { useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'

const IssuedRetiredChartBody = () => {
  const { filteredCreditsHistory, rawCreditsHistory } = useAppState().creditsHistory
  const { t } = useTranslation(`home`)
  const lastUpdatedDate = new Date(rawCreditsHistory?.data?.lastUpdated ?? ``)

  const dataRepresentedAsOf = t(`dataRepresentedAsOf`)
  const formattedDateTime = `${lastUpdatedDate.toLocaleDateString()} ${lastUpdatedDate.toLocaleTimeString()}`

  return (
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
        </GridItem>
      </Grid>
      <Text color={`lightGray.600`}>{`${dataRepresentedAsOf} ${formattedDateTime}`}</Text>
    </VStack>
  )
}

export default IssuedRetiredChartBody
