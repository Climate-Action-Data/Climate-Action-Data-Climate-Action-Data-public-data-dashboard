'use client'
import { NextPage } from 'next'
import { useEffect, useLayoutEffect } from 'react'
import { Container, Flex, Box, Button } from '@chakra-ui/react'
import { shouldReposition, setScroll } from '@/utils/Stickify'
import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { useActions, useEffects } from '@/overmind'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'

const DEFAULT_PROJECT_TO_DISPLAY = 15

const ProjectPage: NextPage = () => {
  const { getProjectResults } = useEffects().projectResult
  const { setProjectResults } = useActions().projectResult

  useEffect(() => {
    getProjectResults(1, DEFAULT_PROJECT_TO_DISPLAY).then((hasProjectResults) => {
      setProjectResults(hasProjectResults)
    })
  }, [])

  const getNewResults = (from: number) => {
    getProjectResults(from, DEFAULT_PROJECT_TO_DISPLAY).then((hasProjectResults) => {
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
      document.addEventListener(
        `scroll`,
        () => {
          shouldReposition(projectTable, projectTableReference, reference, multiScroll)
          shouldReposition(table, tableReference, reference, multiScroll)
        },
        {
          passive: true,
        },
      )
      multiScroll.addEventListener(`scroll`, () => {
        if (multiScroll?.parentNode?.querySelector(`:hover`) == multiScroll) {
          setScroll(tableReference, table)
        }
      })
      tableReference.addEventListener(`scroll`, () => {
        if (tableReference?.parentNode?.querySelector(`:hover`) == tableReference) {
          setScroll(multiScroll, table, `#tableReference`)
        }
      })

      scrollableHeader.addEventListener(`scroll`, () => {
        if (scrollableHeader?.parentNode?.querySelector(`:hover`) == scrollableHeader) {
          setScroll(multiScroll, multiScroll, `#scrollableHeader`)
        }
      })
    }
  })

  return (
    <Flex maxW={`100vw`}>
      <ProjectSearchHead />
      <ProjectSearchBody />
      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={(currentPage, from) => getNewResults(from)} resultPerPage={DEFAULT_PROJECT_TO_DISPLAY} totalResults={89} />
        <Box position="absolute" right="10px" float="right">
          <Button variant="hoverOnly" display="flex" gap="4px" fontWeight="500px">
            Export
            <DownloadIcon />
          </Button>
        </Box>
      </Container>
    </Flex>
  )
}

export default ProjectPage
