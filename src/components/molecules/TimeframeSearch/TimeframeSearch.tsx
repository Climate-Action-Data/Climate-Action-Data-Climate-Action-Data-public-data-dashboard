import { TimeframesData } from '@/@types/Timeframe'
import { useActions, useAppState } from '@/overmind'
import { Flex, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TimeframeSearch = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)
  const { carbonReduction } = useAppState().analytics
  const { setTimeframe } = useActions().analytics

  return (
    <Flex height={`40px`} alignItems={`center`}>
      <HStack spacing={4}>
        {Object.values(TimeframesData).map(
          (timeFrameName, idx) =>
            timeFrameName !== TimeframesData.MAX && (
              <Tag
                size={`md`}
                key={timeFrameName}
                borderRadius="full"
                _hover={{ cursor: `pointer` }}
                variant={timeFrameName === carbonReduction.carbonMapDataFilters.timeframe ? `solid` : `outline`}
                colorScheme="gray"
              >
                <TagLabel data-testid={`button-timeframe-${idx}`} onClick={() => setTimeframe(timeFrameName)}>
                  {t(`timeframes.${timeFrameName}`)}
                </TagLabel>
                {timeFrameName === carbonReduction.carbonMapDataFilters.timeframe && (
                  <TagCloseButton data-testid={`button-timeframe-close`} onClick={() => setTimeframe(TimeframesData.MAX)} />
                )}
              </Tag>
            ),
        )}
      </HStack>
    </Flex>
  )
}
