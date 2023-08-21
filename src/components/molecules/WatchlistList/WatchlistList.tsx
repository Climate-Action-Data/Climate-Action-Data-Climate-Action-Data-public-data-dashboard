import { Watchlist } from '@/@types/Watchlist'
import { WatchlistSummary } from '@/components/atoms/WatchlistSummary/WatchlistSummary'
import { Flex } from '@chakra-ui/react'

interface WatchlistListProps {
  watchlists: Watchlist[]
}

export const WatchlistList = (props: WatchlistListProps) => {
  const { watchlists } = props

  const renderWatchlists = () => {
    return watchlists.map((watchlist) => <WatchlistSummary key={`watchlist-card-${watchlist.id}`} watchlist={watchlist} />)
  }

  return (
    <Flex flexDirection="column" gap="32px" paddingTop="24px">
      {renderWatchlists()}
    </Flex>
  )
}
