import { changeHoverColor } from '@/utils/Stickify'
import { Text, Tbody, Tr, Td, Table } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProjectSearchBodySkeleton } from '../ProjectSearchBodySkeleton/ProjectSearchBodySkeleton'
interface TableDataProps {
  data: string | number | undefined
}

const TableData = (props: TableDataProps) => {
  const { t } = useTranslation(`home`)
  if (props.data !== undefined && typeof props.data === `number`) {
    return <>{props.data.toLocaleString()}</>
  }
  if (props.data !== undefined) {
    return <>{props.data}</>
  } else {
    return <Text color="lightGray.500">{t(`noData`)}</Text>
  }
}
interface ProjectSearchBodyContentProps {
  projectResults?: EffectResponse<ProjectSearchResult[]>
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
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody data-testid="table-scroll">{projectResults?.data ? generateTableRow(projectResults.data) : <ProjectSearchBodySkeleton />}</Tbody>
    </Table>
  )
}
