'use client'
import { useEffect, useLayoutEffect, useState } from 'react'
import { NextPage } from 'next'
import { Box, Container, Flex } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { CSVDownload } from '@/components/molecules/CSVDownload/CSVDownload'
import { CSVExportTypes } from '@/@types/CSV'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'

const ProjectPage: NextPage = () => {
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
  }, [
    keywordSearch,
    selectedProjectSearchFilterValues.searchFilterValues.projectStatus,
    selectedProjectSearchFilterValues.searchFilterValues.countries,
    selectedProjectSearchFilterValues.searchFilterValues.methodologies,
    selectedProjectSearchFilterValues.searchFilterValues.sectors,
    selectedProjectSearchFilterValues.searchFilterValues.creditingPeriod,
  ])

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
    <Flex maxW={`100vw`} w="100vw" minH="100%" h="100%" position="relative" paddingBottom="50px">
      {isLoading ? (
        <SpinnerScreen />
      ) : (
        <>
          <ProjectSearchHead refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
          <ProjectSearchBody refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.PROJECT} />
        </>
      )}

      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={handleOnPageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={projectResults?.data?.totalCount ?? 0} />
        <Box position={[`unset`, `absolute`]} right="10px" float="right">
          <CSVDownload exportType={CSVExportTypes.PROJECT} />
        </Box>
      </Container>
    </Flex>
  )
}

export default ProjectPage
