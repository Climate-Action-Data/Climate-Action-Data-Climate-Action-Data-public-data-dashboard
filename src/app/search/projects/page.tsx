'use client'
import { useEffect, useLayoutEffect } from 'react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { Container, Flex, Box, Button, Hide } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'

const DEFAULT_PROJECT_TO_DISPLAY = 15

const ProjectPage: NextPage = () => {
  const { getProjectResults } = useEffects().projectResult
  const { setProjectResults } = useActions().projectResult
  const { projectResults } = useAppState().projectResult
  const searchParams = useSearchParams()
  const pattern = searchParams.get(`keyword`) ?? ``

  useEffect(() => {
    getProjectResults(pattern).then((hasProjectResults) => {
      setProjectResults(hasProjectResults)
    })
  }, [pattern])

  const handlePageChange = (currentPage: number, from: number) => {
    getProjectResults(pattern, from).then((hasProjectResults) => {
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
        <PaginationWidget onPageChange={handlePageChange} resultPerPage={DEFAULT_PROJECT_TO_DISPLAY} totalResults={projectResults?.data?.totalCount ?? 0} />
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
