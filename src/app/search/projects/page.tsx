'use client'
import { NextPage } from 'next'
import { useLayoutEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { shouldReposition, setScroll } from '@/utils/Stickify'
import { Project } from '@/@types/Project'
import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { ProjectSearchBody } from '@/components/molecules/ProjectSearchBody/ProjectSearchBody'

const testData: Project = {
  name: `15 MW Bundled Solar Power Project`,
  id: `S00985`,
  company: `BYU Solar Private Limited`,
  standard: `Global Carbon Council`,
  methodology: `GCCM001`,
  sector: `Energy`,
  country: `India`,
  status: `Open for public comments`,
  creditingPeriod: `2023/05/10 - 2028/05/24`,
  annualEst: 23621,
  annualIssued: 1000000000,
  annualRetired: 1000000000,
  annualAvailable: 1000000000,
  correspondingAdjustment: `Correspondingly Adjusted`,
}

const testDataNum = 2
const maxData = new Array(testDataNum).fill(testData)

const ProjectPage: NextPage = () => {
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
      <ProjectSearchHead projects={maxData} />
      <ProjectSearchBody projects={maxData} />
    </Flex>
  )
}

export default ProjectPage
