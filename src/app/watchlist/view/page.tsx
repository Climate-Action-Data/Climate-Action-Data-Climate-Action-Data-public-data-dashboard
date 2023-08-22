'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Watchlist } from '@/@types/Watchlist'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { WatchlistMenu } from '@/components/molecules/WatchlistMenu/WatchlistMenu'
import { WatchlistSummary } from '@/components/atoms/WatchlistSummary/WatchlistSummary'
import { useEffects } from '@/overmind'
import { Box, Input, InputGroup, Flex, Button, Card, CardBody, InputRightElement, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WatchlistPage: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``

  const [watchlist, setWatchlist] = useState<Watchlist | undefined>(undefined)
  const { getOneWatchlist } = useEffects().watchlist

  const { t } = useTranslation(`watchlist`)

  useEffect(() => {
    getOneWatchlist(id).then((result) => {
      if (result.data) {
        setWatchlist(result.data)
      }
    })
  }, [id])

  const handleClick = () => {
    //TODO: implement search in next PR
    return true
  }

  return (
    <Box paddingY={[`20px`, `58px`]}>
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
                      <Input pr="4.5rem" type="text" placeholder={t(`searchProjects`)} />
                      <InputRightElement paddingRight="5px" width="auto">
                        <Button data-testid="watchlist-search-projets" padding="4px 8px" variant="blueFilled" rightIcon={<SearchIcon />} onClick={handleClick}>
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
    </Box>
  )
}

export default WatchlistPage
