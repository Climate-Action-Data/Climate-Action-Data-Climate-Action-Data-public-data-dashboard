import { TimeframesData } from '@/@types/Timeframe'
import { useActions, useAppState } from '@/overmind'
import { Flex, HStack, Tag, TagLabel } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TimeframeSearch = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)
  const { carbonReduction } = useAppState().analytics
  const { setTimeframe } = useActions().analytics

  return (
    <Flex height={`40px`} alignItems={`center`}>
      <HStack spacing={4}>
        {Object.values(TimeframesData).map((timeFrameName, idx) => (
          <Tag
            size={`md`}
            key={timeFrameName}
            borderRadius="full"
            _hover={{ cursor: `pointer` }}
            variant={timeFrameName === carbonReduction.carbonMapDataFilters.timeframe ? `solid` : `outline`}
            colorScheme="gray"
            data-testid={`button-timeframe-${idx}`}
            onClick={() => setTimeframe(timeFrameName)}
          >
            <TagLabel>{t(`timeframes.${timeFrameName}`)}</TagLabel>
          </Tag>
        ))}
      </HStack>
    </Flex>
  )
}
