import { Watchlist } from '@/@types/Watchlist'
import { useActions } from '@/overmind'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { Box, Flex, Checkbox, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface WatchlistCheckboxProps {
  watchlists?: Watchlist[]
  warehouseProjectId: string
  selectedWatchlists: string[]
}

export const WatchlistCheckbox = (props: WatchlistCheckboxProps) => {
  const { watchlists, warehouseProjectId, selectedWatchlists } = props
  const [checkBoxStates, setCheckBoxStates] = useState<Record<string, boolean>>({})
  const { t } = useTranslation(`watchlist`)
  const { addProjectToWatchlist, removeProjectFromWatchlist } = useActions().watchlist

  useEffect(() => {
    if (watchlists) {
      const newCheckBoxStates: Record<string, boolean> = {}
      watchlists.forEach((watchlist) => {
        newCheckBoxStates[watchlist.id] = selectedWatchlists.includes(watchlist.id)
      })
      setCheckBoxStates(newCheckBoxStates)
    }
  }, [watchlists])

  const handleWatchlistClick = async (event: React.ChangeEvent<HTMLInputElement>, watchlist: Watchlist) => {
    try {
      if (event.target.checked) {
        await addProjectToWatchlist({ warehouseProjectId, watchlistId: watchlist.id })
        setCheckBoxStates({ ...checkBoxStates, [watchlist.id]: true })
      } else {
        await removeProjectFromWatchlist({ warehouseProjectId, watchlistId: watchlist.id })
        setCheckBoxStates({ ...checkBoxStates, [watchlist.id]: false })
      }
    } catch (error) {}
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
        <Checkbox isChecked={checkBoxStates[watchlist.id]} data-testid="checkbox-watchlist" onChange={(event) => handleWatchlistClick(event, watchlist)}>
          {watchlist.name}
        </Checkbox>
      </Box>
    ))
  }
}
