import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Skeleton, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppState } from '@/overmind'
import { changeHoverColor } from '@/utils/Stickify'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
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

export const ProjectSearchBody = () => {
  const { projectResults } = useAppState().projectResult

  const { t } = useTranslation(`search`)

  return (
    <Flex flexDirection="column" overflow="hidden">
      <TableContainer id="tableReference" className="hide-scrollbar" minH="72px">
        <Table variant="simple" className="searchTable">
          <Thead zIndex={4} id="table" className="">
            <Tr id="scrollableHeader">
              <Th>
                <Box>
                  {t(`table.standard`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th>
                <Box>
                  {t(`table.methodology`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th>
                <Box>
                  {t(`table.sector`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th>
                <Box>
                  {t(`table.country`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th>
                <Box>
                  {t(`table.projectStatus`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th minW="250px !important">
                <Box>
                  {t(`table.creditingPeriod`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th isNumeric>
                <Box>
                  {t(`table.annualEstUnits`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th isNumeric>
                <Box>
                  {t(`table.totalIssuedUnits`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th isNumeric>
                <Box>
                  {t(`table.totalRetiredUnits`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
              <Th isNumeric>
                <Box>
                  {t(`table.totalAvailableUnits`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      <TableContainer id="multiScroll">
        <Table variant="simple" className="searchTable">
          <Tbody data-testid="table-scroll">
            {projectResults?.data ? (
              projectResults.data.map((project, idx) => (
                <Tr onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)} className="project-row-${idx}" key={`project-body-row-${project.id}`} height="92px">
                  <Td>
                    <TableData data={project.standard} />
                  </Td>
                  <Td>
                    <TableData data={project.methodology} />
                  </Td>
                  <Td>
                    <TableData data={project.sector} />
                  </Td>
                  <Td>
                    <TableData data={project.country} />
                  </Td>
                  <Td>
                    <TableData data={project.status} />
                  </Td>
                  <Td minW="250px !important">
                    <TableData data={project.creditingPeriod} />
                  </Td>
                  <Td isNumeric>
                    <TableData data={project.annualEst} />
                  </Td>
                  <Td isNumeric>
                    <TableData data={project.annualIssued} />
                  </Td>
                  <Td isNumeric>
                    <TableData data={project.annualRetired} />
                  </Td>
                  <Td isNumeric>
                    <TableData data={project.annualAvailable} />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr height="92px">
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td isNumeric>
                  <Skeleton height="20px" />
                </Td>
                <Td isNumeric>
                  <Skeleton height="20px" />
                </Td>
                <Td isNumeric>
                  <Skeleton height="20px" />
                </Td>
                <Td isNumeric>
                  <Skeleton height="20px" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
