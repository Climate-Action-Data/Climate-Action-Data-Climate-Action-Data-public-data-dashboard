'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Watchlist } from '@/@types/Watchlist'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { WatchlistMenu } from '@/components/molecules/WatchlistMenu/WatchlistMenu'
import { WatchlistSummary } from '@/components/atoms/WatchlistSummary/WatchlistSummary'
import { useActions, useEffects } from '@/overmind'
import { Box, Input, InputGroup, Flex, Button, Card, CardBody, InputRightElement, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WatchlistProjects } from '@/components/organisms/WatchlistProjects/WatchlistProjects'

const WatchlistPage: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``

  const [watchlist, setWatchlist] = useState<Watchlist | undefined>(undefined)
  const [searchPattern, setSearchPattern] = useState(``)

  const { getOneWatchlist } = useEffects().watchlist
  const { setKeywordSearch } = useActions().searchFilters

  const { t } = useTranslation(`watchlist`)

  useEffect(() => {
    getOneWatchlist(id).then((result) => {
      if (result.data) {
        setWatchlist(result.data)
      }
    })
  }, [id])

  const handleOnSearch = () => {
    setKeywordSearch(searchPattern)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(event.target.value)
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter`) {
      handleOnSearch()
    }
  }
  return (
    <Box paddingTop={[`20px`, `58px`]}>
      <Flex flexWrap="wrap" gap="16px" paddingX={[`10px`, `16px`]}>
        <Box flex={1}>{watchlist ? <WatchlistSummary disableHover showDivider watchlist={watchlist} /> : <></>}</Box>
        <Box>
          <Card minW="400px" minH="164px">
            <CardBody display="flex" padding="24px">
              <VStack flex="1" minH="100%" justifyContent="space-between">
                {watchlist && (
                  <>
                    <WatchlistMenu watchlist={watchlist} />
                    <InputGroup variant="white" width="100%">
                      <Input value={searchPattern} onChange={handleOnChange} onKeyDown={handleOnKeyDown} pr="4.5rem" type="text" placeholder={t(`searchProjects`)} />
                      <InputRightElement paddingRight="5px" width="auto">
                        <Button data-testid="watchlist-search-projets" padding="4px 8px" variant="blueFilled" rightIcon={<SearchIcon />} onClick={handleOnSearch}>
                          {t(`search`)}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </>
                )}
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
      <Flex paddingTop="16px">
        <WatchlistProjects watchlistId={id} />
      </Flex>
    </Box>
  )
}

export default WatchlistPage
