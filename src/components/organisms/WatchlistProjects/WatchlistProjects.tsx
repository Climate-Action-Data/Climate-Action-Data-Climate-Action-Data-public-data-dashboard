import { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Container, Flex, VStack } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { CSVDownload } from '@/components/molecules/CSVDownload/CSVDownload'
import { CSVExportTypes } from '@/@types/CSV'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'

interface WatchlistProjectsProps {
  watchlistId: string
}

export const WatchlistProjects = (props: WatchlistProjectsProps) => {
  const { watchlistId } = props
  const { getProjectSearchResults } = useEffects().projectResult
  const { setProjectResults, clearProjectResults } = useActions().projectResult
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { projectResults } = useAppState().projectResult
  const { selectedProjectSearchFilterValues, keywordSearch } = useAppState().searchFilters

  useEffect(() => {
    clearProjectResults()
    getProjectSearchResults(keywordSearch, selectedProjectSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
      setProjectResults(hasProjectResults)
    })
  }, [keywordSearch])

  const handleRefreshData = () => {
    setIsLoading(true)
    getProjectSearchResults(keywordSearch, selectedProjectSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
      setIsLoading(false)
      setProjectResults(hasProjectResults)
    })
  }

  const handleOnPageChange = (currentPage: number, from: number) => {
    setIsLoading(true)
    getProjectSearchResults(keywordSearch, selectedProjectSearchFilterValues.searchFilterValues, from).then((hasProjectResults) => {
      setIsLoading(false)
      setProjectResults(hasProjectResults)
    })
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

  return (
    <Flex maxW={`100vw`} w="100vw" position="relative" paddingBottom="16px">
      {isLoading ? (
        <SpinnerScreen />
      ) : (
        <>
          <ProjectSearchHead watchlistId={watchlistId} refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
          <ProjectSearchBody refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
        </>
      )}

      <VStack>
        <Container variant={`paginationBar`} bottom="0px">
          <PaginationWidget onPageChange={handleOnPageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={projectResults?.data?.totalCount ?? 0} />
          <Box position={[`unset`, `absolute`]} right="10px" float="right">
            <CSVDownload totalResults={projectResults?.data?.totalCount} exportType={CSVExportTypes.PROJECT} />
          </Box>
        </Container>
      </VStack>
    </Flex>
  )
}
