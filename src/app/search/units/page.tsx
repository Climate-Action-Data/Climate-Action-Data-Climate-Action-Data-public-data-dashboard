'use client'
import { NextPage } from 'next'
import { useEffect, useLayoutEffect } from 'react'
import { Container, Flex, Box, Button, Hide } from '@chakra-ui/react'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { useActions, useEffects } from '@/overmind'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { UnitSearchBody } from '@/components/molecules/UnitSearchBody/UnitSearchBody'

const DEFAULT_PROJECT_TO_DISPLAY = 15

const UnitPage: NextPage = () => {
  const { getUnitResults } = useEffects().unitResult
  const { setUnitResults } = useActions().unitResult

  useEffect(() => {
    getUnitResults(1, DEFAULT_PROJECT_TO_DISPLAY).then((hasUnitResults) => {
      setUnitResults(hasUnitResults)
    })
  }, [])

  const handlePageChange = (currentPage: number, from: number) => {
    getUnitResults(from, DEFAULT_PROJECT_TO_DISPLAY).then((hasUnitResults) => {
      setUnitResults(hasUnitResults)
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
      <ProjectSearchHead renderType={ALLOWED_RENDER_TYPE.UNIT} />
      <UnitSearchBody renderType={ALLOWED_RENDER_TYPE.UNIT} />
      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={handlePageChange} resultPerPage={DEFAULT_PROJECT_TO_DISPLAY} totalResults={89} />
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

export default UnitPage
