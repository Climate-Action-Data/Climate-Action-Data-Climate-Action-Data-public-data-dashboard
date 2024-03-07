import { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Container, Flex, VStack } from '@chakra-ui/react'

import { useActions, useAppState } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'
import { NoProjectsWatchlist } from '@/components/atoms/NoProjectsWatchlist/NoProjectsWatchlist'

interface WatchlistProjectsProps {
  watchlistId: string
}

export const WatchlistProjects = (props: WatchlistProjectsProps) => {
  const { watchlistId } = props
  const { getWatchlistProjects } = useActions().watchlist
  const { setProjectResults, clearProjectResults } = useActions().projectResult
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { projectResults } = useAppState().projectResult
  const { keywordSearch } = useAppState().searchFilters

  useEffect(() => {
    clearProjectResults()
    getWatchlistProjects({ id: watchlistId })
      .then((hasProjectResults) => {
        if (hasProjectResults?.data) {
          setProjectResults(hasProjectResults)
        }
      })
      .catch(() => undefined)
  }, [keywordSearch])

  const handleRefreshData = () => {
    setIsLoading(true)
    getWatchlistProjects({ id: watchlistId })
      .then((hasProjectResults) => {
        setIsLoading(false)
        if (hasProjectResults?.data) {
          setProjectResults(hasProjectResults)
        }
      })
      .catch(() => undefined)
  }

  const handleOnPageChange = (currentPage: number, from: number) => {
    setIsLoading(true)
    getWatchlistProjects({ id: watchlistId, from })
      .then((hasProjectResults) => {
        setIsLoading(false)
        if (hasProjectResults?.data) {
          setProjectResults(hasProjectResults)
        }
      })
      .catch(() => undefined)
  }

  useLayoutEffect(() => {
    const projectTable = document.querySelector(`#projectTable`)
    const projectTableReference = document.querySelector(`#projectTableReference`)
    const table = document.querySelector(`#table`)
    const tableReference = document.querySelector(`#tableReference`)
    const reference = document.querySelector(`#headerReference`)
    const scrollableHeader = document.querySelector(`#scrollableHeader`)
    const multiScroll = document.querySelector(`#multiScroll`)

    if (table && tableReference && reference && projectTable && projectTableReference && multiScroll && scrollableHeader) {
      setScrollEventListeners(table, tableReference, reference, projectTable, projectTableReference, multiScroll, scrollableHeader)
    }
  })

  const renderTable = () => {
    if (projectResults?.data?.totalCount === 0) {
      return (
        <Flex flex={1} paddingTop={[`10px`, `40px`]} justifyContent="center">
          <NoProjectsWatchlist />
        </Flex>
      )
    } else {
      return (
        <>
          <ProjectSearchHead watchlistId={watchlistId} refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
          <ProjectSearchBody refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
        </>
      )
    }
  }

  return (
    <Flex maxW={`100vw`} w="100vw" position="relative" paddingBottom="16px">
      {isLoading ? <SpinnerScreen /> : renderTable()}

      <VStack>
        <Container variant={`paginationBar`} bottom="0px">
          {projectResults?.data?.totalCount && projectResults.data.totalCount > 0 ? (
            <>
              <PaginationWidget onPageChange={handleOnPageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={projectResults?.data?.totalCount} />
              <Box position={[`unset`, `absolute`]} right="10px" float="right">
                {/* <CSVDownload totalResults={projectResults?.data?.totalCount} exportType={CSVExportTypes.PROJECT} /> */}
              </Box>
            </>
          ) : (
            <></>
          )}
        </Container>
      </VStack>
    </Flex>
  )
}
