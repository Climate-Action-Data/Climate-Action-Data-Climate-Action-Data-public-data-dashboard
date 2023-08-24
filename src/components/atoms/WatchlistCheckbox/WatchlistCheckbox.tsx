import { Watchlist } from '@/@types/Watchlist'
import { useActions } from '@/overmind'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { Box, Flex, Checkbox, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface WatchlistCheckboxProps {
  watchlists?: Watchlist[]
  warehouseProjectId: string
  selectedWatchlists: string[]
}

export const WatchlistCheckbox = (props: WatchlistCheckboxProps) => {
  const { watchlists, warehouseProjectId, selectedWatchlists } = props
  const { t } = useTranslation(`watchlist`)
  const { addProjectToWatchlist, removeProjectFromWatchlist } = useActions().watchlist

  const handleWatchlistClick = async (event: React.ChangeEvent<HTMLInputElement>, watchlist: Watchlist) => {
    try {
      if (event.target.checked) {
        await addProjectToWatchlist({ warehouseProjectId, watchlistId: watchlist.id })
      } else {
        await removeProjectFromWatchlist({ warehouseProjectId, watchlistId: watchlist.id })
      }
    } catch (error) {}
  }

  const shouldBeChecked = (id: string) => {
    return selectedWatchlists.includes(id)
  }

  if (!watchlists || watchlists?.length === 0) {
    return (
      <Flex width="100%" justifyContent="center">
        <Text>{t(`noWatchlist`)}</Text>
      </Flex>
    )
  } else {
    return watchlists.map((watchlist) => (
      <Box key={`watchlist-check-${generateRandomString()}`} padding="6px 16px">
        <Checkbox isChecked={shouldBeChecked(watchlist.id)} data-testid="checkbox-watchlist" onChange={(event) => handleWatchlistClick(event, watchlist)}>
          {watchlist.name}
        </Checkbox>
      </Box>
    ))
  }
}
