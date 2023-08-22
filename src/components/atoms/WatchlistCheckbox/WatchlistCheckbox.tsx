import { Watchlist } from '@/@types/Watchlist'
import { useEffects } from '@/overmind'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { Box, Center, Checkbox, Text } from '@chakra-ui/react'
import { t } from 'i18next'

interface WatchlistCheckboxProps {
  watchlists?: Watchlist[]
  warehouseProjectId: string
}

export const WatchlistCheckbox = (props: WatchlistCheckboxProps) => {
  const { watchlists, warehouseProjectId } = props

  const { addProjectToWatchlist, removeProjectFromWatchlist } = useEffects().watchlist

  const handleWatchlistClick = (event: React.ChangeEvent<HTMLInputElement>, watchlist: Watchlist) => {
    if (event.target.checked) {
      addProjectToWatchlist(warehouseProjectId, watchlist.id)
    } else {
      removeProjectFromWatchlist(warehouseProjectId, watchlist.id)
    }
  }

  if (!watchlists || watchlists?.length === 0) {
    return (
      <Center>
        <Text>{t(`noWatchlist`)}</Text>
      </Center>
    )
  } else {
    return watchlists.map((watchlist) => (
      <Box key={`watchlist-check-${generateRandomString()}`} padding="6px 16px">
        <Checkbox data-testid="checkbox-watchlist" onChange={(event) => handleWatchlistClick}>
          {watchlist.name}
        </Checkbox>
      </Box>
    ))
  }
}
