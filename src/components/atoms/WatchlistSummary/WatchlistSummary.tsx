import { Watchlist } from '@/@types/Watchlist'
import { Card, Text, Heading, CardBody, Flex, Divider } from '@chakra-ui/react'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { Aeonik, AeonikFono } from '@/styles/fonts'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

interface WatchlistSummaryProps {
  watchlist: Watchlist
  showDivider?: boolean
  disableHover?: boolean
}

export const WatchlistSummary = (props: WatchlistSummaryProps) => {
  const { watchlist, showDivider } = props
  const { t } = useTranslation(`watchlist`)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/watchlist/view?id=${watchlist.id}`)
  }

  const getVariant = () => {
    return props.disableHover ? `watchlistNoHover` : `watchlist`
  }

  return (
    <Card onClick={handleClick} data-testid="watchlist-summary-item" variant={getVariant()}>
      <CardBody flexWrap="wrap">
        <Flex gap="4px" justifyContent="center" flexDirection="column" flex={1}>
          <Heading fontFamily={Aeonik.style.fontFamily} fontSize="20px">
            {watchlist.name}
          </Heading>
          {showDivider && <Divider />}
          <Text color="lightGray.700">{watchlist.description}</Text>
        </Flex>
        <Flex marginLeft="20px" gap="8px" alignItems="center">
          <ImportantText fontFamily={AeonikFono.style.fontFamily} fontWeight="400">
            {watchlist.projectsCount}
          </ImportantText>
          <Text fontSize="lg">{t(`project`, { count: watchlist.projectsCount })}</Text>
        </Flex>
      </CardBody>
    </Card>
  )
}
