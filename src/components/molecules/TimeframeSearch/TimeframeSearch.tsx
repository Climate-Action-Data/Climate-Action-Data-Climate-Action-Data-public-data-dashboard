import { TimeframesData } from '@/@types/Timeframe'
import { useActions, useAppState } from '@/overmind'
import { Flex, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'

export const TimeframeSearch = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)
  const { carbonReduction } = useAppState().analytics
  const { setTimeframe } = useActions().analytics

  return (
    <Flex height={`40px`} alignItems={`center`}>
      <HStack spacing={4}>
        {Object.values(TimeframesData).map((timeFrameName, idx) => (
          <SelectableChip
            label={t(`timeframes.${timeFrameName}`)}
            key={`issued-retired-${timeFrameName}`}
            data-testid={`button-timeframe-${idx}`}
            isSelected={timeFrameName === carbonReduction.carbonMapDataFilters.timeframe}
            onClick={() => setTimeframe(timeFrameName)}
          />
        ))}
      </HStack>
    </Flex>
  )
}
