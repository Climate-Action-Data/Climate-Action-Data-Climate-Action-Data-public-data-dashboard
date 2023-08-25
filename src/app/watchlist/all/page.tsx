'use client'
import { Watchlist, WatchlistSorting } from '@/@types/Watchlist'
import { Dropdown, Item } from '@/components/atoms/Dropdown/Dropdown'
import { EditWatchlistPopup } from '@/components/atoms/EditWatchlistPopup/EditWatchlistPopup'
import { NoWatchlistScreen } from '@/components/atoms/NoWatchlistScreen/NoWatchlistScreen'
import { PlusIcon } from '@/components/atoms/PlusIcon/PlusIcon'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'
import { WatchlistBreadcrumb } from '@/components/atoms/WatchlistBreadcrumb/WatchlistBreadcrumb'
import { WatchlistList } from '@/components/molecules/WatchlistList/WatchlistList'
import { useActions } from '@/overmind'
import { Heading, Box, Input, InputGroup, InputLeftElement, Flex, Button, Center } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WatchlistPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(undefined)
  const [visibleWatchlists, setVisibleWatchlists] = useState<Watchlist[] | undefined>(undefined)

  const { t } = useTranslation(`watchlist`)

  const sortOptions: Item[] = Object.values(WatchlistSorting).map((value) => {
    return { label: t(value), value }
  })

  const { getAllWatchlist, createOneWatchlist } = useActions().watchlist

  useEffect(() => {
    if (watchlists === undefined) {
      getWatchlists()
    }
  }, [])

  const getWatchlists = () => {
    getAllWatchlist()
      .then((result) => {
        if (result.data) {
          result.data.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          setWatchlists(result.data)
          setVisibleWatchlists(result.data)
        } else {
          setWatchlists([])
          setVisibleWatchlists([])
        }
      })
      .catch(() => {
        setWatchlists([])
        setVisibleWatchlists([])
      })
  }

  const renderList = () => {
    if (visibleWatchlists && visibleWatchlists.length > 0) {
      return <WatchlistList watchlists={visibleWatchlists} />
    } else {
      return (
        <Center marginTop={[`20px`, `100px`]}>
          <NoWatchlistScreen onClick={handleCreateWatchlist} />
        </Center>
      )
    }
  }

  const renderBody = () => {
    if (!visibleWatchlists) {
      return (
        <Center>
          <SpinnerScreen />
        </Center>
      )
    } else {
      return renderList()
    }
  }

  const handleCreateWatchlist = () => {
    setIsModalOpen(true)
  }

  const handleCreateConfirm = (name: string, description: string) => {
    createOneWatchlist({ name, description })
      .then(async (result) => {
        if (result?.data) {
          getWatchlists()
        }
      })
      .catch(() => undefined)
      .finally(() => {
        setIsModalOpen(false)
      })
  }

  const handleCreateCancel = () => {
    setIsModalOpen(false)
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
          return b.projectsCount - a.projectsCount
        })
        break
    }
    setVisibleWatchlists([...orderedWatchlists])
    setWatchlists([...orderedWatchlists])
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase()
    if (visibleWatchlists && searchValue !== ``) {
      const filteredWatchlists = visibleWatchlists?.filter((watchlist) => {
        return watchlist.name.toLowerCase().includes(searchValue)
      })
      setVisibleWatchlists(filteredWatchlists)
    } else if (searchValue === ``) {
      setVisibleWatchlists(watchlists)
    }
  }

  return (
    <>
      <WatchlistBreadcrumb />
      <Box paddingY={[`20px`, `58px`]} paddingX={[`10px`, `220px`]}>
        <Heading>{t(`yourWatchlists`)}</Heading>
        <Box paddingTop="32px">
          <Flex flexWrap="wrap" alignItems="center" justifyContent="space-between">
            <InputGroup marginBottom="24px" variant="white" w="416px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input onChange={handleOnChange} variant={`white`} data-testid="search-watchlist" placeholder={t(`searchWatchlist`)} />
            </InputGroup>
            {visibleWatchlists && visibleWatchlists.length > 0 && (
              <Button data-testid="page-create-watchlist-button" marginBottom="24px" onClick={handleCreateWatchlist} rightIcon={<PlusIcon />} variant={`blueOutline`}>
                {t(`newWatchlist`)}
              </Button>
            )}
          </Flex>
          <Flex>
            <Dropdown items={sortOptions} onItemClick={(selectedSort) => handleSort(selectedSort)} placeholder={t(`sortBy`)} />
          </Flex>
          {renderBody()}
        </Box>
        <EditWatchlistPopup isOpen={isModalOpen} isNewWatchlist={true} title={t(`newWatchlist`)} onCancel={handleCreateCancel} onConfirm={handleCreateConfirm} />
      </Box>
    </>
  )
}

export default WatchlistPage
