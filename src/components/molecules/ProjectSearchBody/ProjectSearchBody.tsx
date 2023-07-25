import { Project } from '@/@types/Project'
import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface ProjectSearchBodyProps {
  projects: Project[]
}
export const ProjectSearchBody = (props: ProjectSearchBodyProps) => {
  const { projects } = props

  const { t } = useTranslation(`search`)

  return (
    <Flex flexDirection={`column`} overflow={`hidden`}>
      <TableContainer id="tableReference" className="hide-scrollbar" minH={`72px`}>
        <Table variant="simple" className="searchTable">
          <Thead id="table" className="">
            <Tr id="scrollableHeader">
              <Th>{t(`table.standard`)}</Th>
              <Th>{t(`table.methodology`)}</Th>
              <Th>{t(`table.sector`)}</Th>
              <Th>{t(`table.country`)}</Th>
              <Th>{t(`table.projectStatus`)}</Th>
              <Th>{t(`table.creditingPeriod`)}</Th>
              <Th isNumeric>{t(`table.annualEstUnits`)}</Th>
              <Th isNumeric>{t(`table.totalIssuedUnits`)}</Th>
              <Th isNumeric>{t(`table.totalRetiredUnits`)}</Th>
              <Th isNumeric>{t(`table.totalAvailableUnits`)}</Th>
              <Th>{t(`table.correspondingAdjustment`)}</Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      <TableContainer id="multiScroll">
        <Table variant="simple" className="searchTable">
          <Tbody>
            {projects.map((project) => (
              <Tr key={`project-body-row-${project.id}`} height="92px">
                <Td>{project.standard}</Td>
                <Td>{project.methodology}</Td>
                <Td>{project.sector}</Td>
                <Td>{project.country}</Td>
                <Td>{project.status}</Td>
                <Td>{project.creditingPeriod}</Td>
                <Td isNumeric>{project.annualEst}</Td>
                <Td isNumeric>{project.annualIssued}</Td>
                <Td isNumeric>{project.annualRetired}</Td>
                <Td isNumeric>{project.annualAvailable}</Td>
                <Td>{project.correspondingAdjustment}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
