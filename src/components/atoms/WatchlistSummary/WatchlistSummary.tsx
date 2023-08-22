import { Watchlist } from '@/@types/Watchlist'
import { Card, Text, Heading, CardBody, Flex } from '@chakra-ui/react'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { Aeonik, AeonikFono } from '@/styles/fonts'
import { useTranslation } from 'react-i18next'

interface WatchlistSummaryProps {
  watchlist: Watchlist
}

export const WatchlistSummary = (props: WatchlistSummaryProps) => {
  const { watchlist } = props
  const { t } = useTranslation(`watchlist`)

  return (
    <Card data-testid="watchlist-summary-item" variant={`watchlist`}>
      <CardBody>
        <Flex gap="4px" justifyContent="center" flexDirection="column" flex={1}>
          <Heading fontFamily={Aeonik.style.fontFamily} fontSize="20px">
            {watchlist.name}
          </Heading>
          <Text color="lightGray.700">{watchlist.description}</Text>
        </Flex>
        <Flex gap="8px" alignItems="center">
          <ImportantText fontFamily={AeonikFono.style.fontFamily} fontWeight="400">
            {watchlist.projects}
          </ImportantText>
          <Text fontSize="lg">{t(`project`, { count: watchlist.projects })}</Text>
        </Flex>
      </CardBody>
    </Card>
  )
}
