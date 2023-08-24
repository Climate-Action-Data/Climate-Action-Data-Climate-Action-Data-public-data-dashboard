'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Watchlist } from '@/@types/Watchlist'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { WatchlistMenu } from '@/components/molecules/WatchlistMenu/WatchlistMenu'
import { WatchlistSummary } from '@/components/atoms/WatchlistSummary/WatchlistSummary'
import { useActions } from '@/overmind'
import { Box, Input, InputGroup, Flex, Button, Card, CardBody, Text, InputRightElement, VStack, Hide, Heading, Divider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WatchlistProjects } from '@/components/organisms/WatchlistProjects/WatchlistProjects'
import { Aeonik } from '@/styles/fonts'

const WatchlistPage: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``

  const [watchlist, setWatchlist] = useState<Watchlist | undefined>(undefined)
  const [searchPattern, setSearchPattern] = useState(``)

  const { getOneWatchlist } = useActions().watchlist
  const { setKeywordSearch } = useActions().searchFilters

  const { t } = useTranslation(`watchlist`)

  useEffect(() => {
    getWatchlistDetails()
  }, [])

  const getWatchlistDetails = () => {
    getOneWatchlist(id)
      .then((result) => {
        console.log(result)
        if (result.data) {
          setWatchlist(result.data)
        }
      })
      .catch(() => undefined)
  }

  const handleOnSearch = () => {
    setKeywordSearch(searchPattern)
  }

  const handleOnRename = () => {
    getWatchlistDetails()
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
        <Hide below="md">
          <Box flex={1}>{watchlist ? <WatchlistSummary disableHover showDivider watchlist={watchlist} /> : <></>}</Box>
        </Hide>
        <Box>
          <Card minW="400px" minH="164px">
            <CardBody display="flex" padding="24px">
              <VStack flex="1" minH="100%" justifyContent="space-between">
                {watchlist && (
                  <>
                    <Flex width="100%">
                      <Hide above="sm">
                        <VStack alignItems="start" flex={1}>
                          <Heading fontFamily={Aeonik.style.fontFamily} fontSize="20px">
                            {watchlist.name}
                          </Heading>
                          <Divider />
                          <Text color="lightGray.700">{watchlist.description}</Text>
                        </VStack>
                      </Hide>
                      <Flex width={[`auto`, `100%`]} justifyContent={[`start`, `end`]} h="100%">
                        <WatchlistMenu onRename={handleOnRename} watchlist={watchlist} />
                      </Flex>
                    </Flex>

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
