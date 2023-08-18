'use client'
import { NextPage } from 'next'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Container, Flex } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { UnitSearchBody } from '@/components/molecules/UnitSearchBody/UnitSearchBody'
import { CSVDownload } from '@/components/molecules/CSVDownload/CSVDownload'
import { CSVExportTypes } from '@/@types/CSV'
import { SpinnerScreen } from '@/components/atoms/SpinnerScreen/SpinnerScreen'

const UnitPage: NextPage = () => {
  const { getUnitsSearchResults } = useEffects().unitResult
  const { setUnitResults, clearUnitResults } = useActions().unitResult
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { unitResults } = useAppState().unitResult
  const { selectedUnitSearchFilterValues, keywordSearch } = useAppState().searchFilters

  useEffect(() => {
    clearUnitResults()
    getUnitsSearchResults(keywordSearch, selectedUnitSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
      setUnitResults(hasProjectResults)
    })
  }, [
    keywordSearch,
    selectedUnitSearchFilterValues.searchFilterValues.unitStatus,
    selectedUnitSearchFilterValues.searchFilterValues.projectStatus,
    selectedUnitSearchFilterValues.searchFilterValues.sectors,
    selectedUnitSearchFilterValues.searchFilterValues.countries,
    selectedUnitSearchFilterValues.searchFilterValues.vintageYear,
  ])

  const handleRefreshData = () => {
    setIsLoading(true)
    getUnitsSearchResults(keywordSearch, selectedUnitSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
      setUnitResults(hasProjectResults)
      setIsLoading(false)
    })
  }

  const handlePageChange = (currentPage: number, from: number) => {
    setIsLoading(true)
    getUnitsSearchResults(keywordSearch, selectedUnitSearchFilterValues.searchFilterValues, from).then((hasProjectResults) => {
      setUnitResults(hasProjectResults)
      setIsLoading(false)
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
    <Flex w="100vw" maxW="100vw" paddingBottom="50px">
      {isLoading ? (
        <SpinnerScreen />
      ) : (
        <>
          <ProjectSearchHead refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.UNIT} />
          <UnitSearchBody refreshData={handleRefreshData} renderType={ALLOWED_RENDER_TYPE.UNIT} />
        </>
      )}

      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={handlePageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={unitResults?.data?.totalCount ?? 0} />
        <Box position={[`unset`, `absolute`]} right="10px" float="right">
          <CSVDownload exportType={CSVExportTypes.UNIT} />
        </Box>
      </Container>
    </Flex>
  )
}

export default UnitPage
