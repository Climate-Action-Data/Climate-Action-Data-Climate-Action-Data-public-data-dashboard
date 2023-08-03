import { Flex, TableContainer, Table, Tr, Tbody, Td, Text } from '@chakra-ui/react'
import { useAppState } from '@/overmind'

import { changeHoverColor } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { ProjectSearchBodyHeader } from '@/components/atoms/ProjectSearchBodyHeader/ProjectSearchBodyHeader'
import { ProjectSearchBodySkeleton } from '@/components/atoms/ProjectSearchBodySkeleton/ProjectSearchBodySkeleton'
import { useRouter } from 'next/navigation'
interface TableDataProps {
  data: string | number | undefined
}

const TableData = (props: TableDataProps) => {
  if (props.data !== undefined && typeof props.data === `number`) {
    return <>{props.data.toLocaleString()}</>
  }
  if (props.data !== undefined) {
    return <>{props.data}</>
  } else {
    return <Text color="lightGray.500">--</Text>
  }
}
interface ProjectSearchBodyProps {
  renderType?: string
}

export const ProjectSearchBody = (props: ProjectSearchBodyProps) => {
  const { renderType } = props
  const { projectResults } = useAppState().projectResult
  const router = useRouter()
  if (renderType !== ALLOWED_RENDER_TYPE) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" overflow="hidden">
      <ProjectSearchBodyHeader />
      <TableContainer id="multiScroll">
        <Table variant="simple" className="searchTable">
          <Tbody data-testid="table-scroll">
            {projectResults?.data ? (
              projectResults.data.map((project, idx) => (
                <Tr
                  onClick={() => router.push(`/project/${project.warehouseProjectId}`)}
                  onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
                  className={`project-row-${idx}`}
                  key={`project-body-row-${project.id}`}
                  height="92px"
                >
                  <Td title={project.standard}>
                    <TableData data={project.standard} />
                  </Td>
                  <Td title={project.methodology}>
                    <TableData data={project.methodology} />
                  </Td>
                  <Td title={project.sector}>
                    <TableData data={project.sector} />
                  </Td>
                  <Td title={project.country}>
                    <TableData data={project.country} />
                  </Td>
                  <Td title={project.status}>
                    <TableData data={project.status} />
                  </Td>
                  <Td minW="250px !important" title={project.creditingPeriod}>
                    <TableData data={project.creditingPeriod} />
                  </Td>
                  <Td isNumeric title={project.annualEst?.toString()}>
                    <TableData data={project.annualEst} />
                  </Td>
                  <Td isNumeric title={project.annualIssued?.toString()}>
                    <TableData data={project.annualIssued} />
                  </Td>
                  <Td isNumeric title={project.annualRetired?.toString()}>
                    <TableData data={project.annualRetired} />
                  </Td>
                  <Td isNumeric title={project.annualAvailable?.toString()}>
                    <TableData data={project.annualAvailable} />
                  </Td>
                </Tr>
              ))
            ) : (
              <ProjectSearchBodySkeleton />
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
