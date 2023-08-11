'use client'
import { useEffect, useLayoutEffect } from 'react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { Box, Button, Container, Flex, Hide } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY, ESearchParams } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'

const ProjectPage: NextPage = () => {
  const { getProjectSearchResults, getProjectFilterResults } = useEffects().projectResult
  const { setProjectResults } = useActions().projectResult
  const { resetSearchFilters } = useActions().searchFilters
  const { projectResults } = useAppState().projectResult
  const { selectedProjectSearchFilterValues } = useAppState().searchFilters
  const searchParams = useSearchParams()
  const pattern = searchParams.get(ESearchParams.KEYWORD) ?? ``
  const filter = searchParams.get(ESearchParams.FILTER) ?? undefined

  useEffect(() => {
    if (filter) {
      getProjectFilterResults(selectedProjectSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
        setProjectResults(hasProjectResults)
      })
    } else {
      resetSearchFilters()
      getProjectSearchResults(pattern).then((hasProjectResults) => {
        setProjectResults(hasProjectResults)
      })
    }
  }, [pattern])

  const handleOnPageChange = (currentPage: number, from: number) => {
    getProjectSearchResults(pattern, from).then((hasProjectResults) => {
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
    <Flex maxW={`100vw`} paddingBottom="50px">
      <ProjectSearchHead renderType={ALLOWED_RENDER_TYPE.PROJECT} />
      <ProjectSearchBody renderType={ALLOWED_RENDER_TYPE.PROJECT} />
      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={handleOnPageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={projectResults?.data?.totalCount ?? 0} />
        <Box position={[`unset`, `absolute`]} right="10px" float="right">
          <Button variant="hoverOnly" display="flex" gap="4px" fontWeight="500px">
            <Hide below="md">Export</Hide>
            <DownloadIcon />
          </Button>
        </Box>
      </Container>
    </Flex>
  )
}

export default ProjectPage
