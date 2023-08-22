'use client'
import { Watchlist, WatchlistSorting } from '@/@types/Watchlist'
import { Dropdown, Item } from '@/components/atoms/Dropdown/Dropdown'
import { NoWatchlistScreen } from '@/components/atoms/NoWatchlistScreen/NoWatchlistScreen'
import { PlusIcon } from '@/components/atoms/PlusIcon/PlusIcon'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'
import { WatchlistList } from '@/components/molecules/WatchlistList/WatchlistList'
import { useEffects } from '@/overmind'
import { Heading, Box, Input, InputGroup, InputLeftElement, Flex, Button, Center } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WatchlistPage: NextPage = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(undefined)

  const { t } = useTranslation(`watchlist`)

  const sortOptions: Item[] = Object.values(WatchlistSorting).map((value) => {
    return { label: t(value), value }
  })

  const { getAllWatchlist } = useEffects().watchlist

  useEffect(() => {
    getAllWatchlist().then((result) => {
      if (result.data) {
        setWatchlists(result.data)
      }
    })
  }, [])

  const renderList = () => {
    if (watchlists && watchlists.length > 0) {
      return <WatchlistList watchlists={watchlists} />
    } else {
      return <NoWatchlistScreen />
    }
  }

  const renderBody = () => {
    if (!watchlists) {
      return (
        <Center>
          <SpinnerScreen />
        </Center>
      )
    } else {
      return renderList()
    }
  }

  const handleSort = (selectedSort: Item) => {
    if (!watchlists) {
      return
    }
    const orderedWatchlists: Watchlist[] = [...watchlists]
    switch (selectedSort.value) {
      case WatchlistSorting.RECENTLY_ADDED:
        orderedWatchlists.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        break
      case WatchlistSorting.ALPHABETICAL:
        orderedWatchlists.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        break
      case WatchlistSorting.NUMBER_OF_PROJECTS:
        orderedWatchlists.sort((a, b) => {
          return b.projects - a.projects
        })
        break
    }
    setWatchlists([...orderedWatchlists])
  }

  return (
    <Box paddingY={[`20px`, `58px`]} paddingX={[`10px`, `220px`]}>
      <Heading>{t(`yourWatchlists`)}</Heading>
      <Box paddingTop="32px">
        <Flex justifyContent="space-between">
          <InputGroup variant="white" w="416px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input variant={`white`} type="tel" placeholder={t(`searchWatchlist`)} />
          </InputGroup>
          {watchlists && watchlists.length > 0 && (
            <Button rightIcon={<PlusIcon />} variant={`blueOutline`}>
              {t(`newWatchlist`)}
            </Button>
          )}
        </Flex>
        <Flex paddingTop="24px">
          <Dropdown items={sortOptions} onItemClick={(selectedSort) => handleSort(selectedSort)} placeholder={t(`sortBy`)} />
        </Flex>
        {renderBody()}
      </Box>
    </Box>
  )
}

export default WatchlistPage
