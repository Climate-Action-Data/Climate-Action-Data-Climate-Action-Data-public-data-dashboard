import { changeHoverColor } from '@/utils/Stickify'
import { Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { ProjectSearchResponse, ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { ProjectSearchBodySkeleton } from '../ProjectSearchBodySkeleton/ProjectSearchBodySkeleton'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { TableData } from '../TableData/TableData'
const renderCreditingPeriod = (startDate: string | undefined, endDate: string | undefined) => {
  if (startDate && endDate) {
    return `${formatDate(startDate, DateFormats.YYYY_MM_DD)} - ${formatDate(endDate, DateFormats.YYYY_MM_DD)}`
  }
  if (startDate) {
    return formatDate(startDate, DateFormats.YYYY_MM_DD)
  }
  if (endDate) {
    return formatDate(endDate, DateFormats.YYYY_MM_DD)
  }
}

interface ProjectSearchBodyContentProps {
  projectResults?: EffectResponse<ProjectSearchResponse>
}

export const ProjectSearchBodyContent = (props: ProjectSearchBodyContentProps) => {
  const { projectResults } = props
  const router = useRouter()

  const generateTableRow = (projectList: ProjectSearchResult[]) => {
    return projectList.map((project, idx) => (
      <Tr
        onClick={() => router.push(`/project/${project.warehouseProjectId}`)}
        data-testid="table-row"
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
        <Td minW="250px !important" title={`${project.creditingPeriodStart}-${project.creditingPeriodEnd}`}>
          <TableData data={renderCreditingPeriod(project.creditingPeriodStart, project.creditingPeriodEnd)} />
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
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody data-testid="table-scroll">{projectResults?.data?.projects ? generateTableRow(projectResults.data.projects) : <ProjectSearchBodySkeleton />}</Tbody>
    </Table>
  )
}
