'use client'
import { Watchlist } from '@/@types/Watchlist'
import { Dropdown } from '@/components/atoms/Dropdown/Dropdown'
import { NoWatchlistScreen } from '@/components/atoms/NoWatchlistScreen/NoWatchlistScreen'
import { PlusIcon } from '@/components/atoms/PlusIcon/PlusIcon'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'
import { WatchlistList } from '@/components/molecules/WatchlistList/WatchlistList'
import { useEffects } from '@/overmind'
import { Heading, Box, Input, InputGroup, InputLeftElement, Flex, Button, Center } from '@chakra-ui/react'
// import { Watchlist } from '@/@types/Watchlist'
// import { useEffects } from '@/overmind'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'

const WatchlistPage: NextPage = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(undefined)

  const { t } = useTranslation(`watchlist`)
  //   const { t: tHome } = useTranslation(`home`)
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
          <Dropdown
            items={[
              { label: `Test`, value: `test` },
              { label: `Plop`, value: `plop` },
            ]}
            onItemClick={() => {
              console.log(`click`)
            }}
            placeholder={t(`sortBy`)}
          />
        </Flex>
        {renderBody()}
      </Box>
    </Box>
  )
}

export default WatchlistPage
