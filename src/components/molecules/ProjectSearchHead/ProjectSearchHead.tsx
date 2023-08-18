import { useActions, useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'

import { ProjectSearchHeadContent } from '@/components/atoms/ProjectSearchHeadContent/ProjectSearchHeadContent'
import { UnitSearchHeadContent } from '@/components/atoms/UnitSearchHeadContent/UnitSearchHeadContent'
import { ProjectSearchSortBy, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'

interface ProjectSearchHeadProps {
  renderType?: string
  refreshData?: () => void
}

export const ProjectSearchHead = (props: ProjectSearchHeadProps) => {
  const { renderType, refreshData } = props
  const { projectResults } = useAppState().projectResult
  const { unitResults } = useAppState().unitResult
  const { setSortByProject, setSortByUnit } = useActions().searchFilters
  const { selectedProjectSearchFilterValues } = useAppState().searchFilters
  const { t } = useTranslation(`search`)

  const getSortingValue = () => {
    switch (renderType) {
      case ALLOWED_RENDER_TYPE.PROJECT:
        return ProjectSearchSortBy.NAME
      case ALLOWED_RENDER_TYPE.UNIT:
        return UnitSearchSortBy.PROJECT_NAME
      default:
        return ProjectSearchSortBy.NAME
    }
  }

  const handleSort = (sortBy: ProjectSearchSortBy | UnitSearchSortBy, direction: DatabaseQueryDirection) => {
    switch (renderType) {
      case ALLOWED_RENDER_TYPE.PROJECT:
        setSortByProject({ sortBy: sortBy as ProjectSearchSortBy, direction })
        if (refreshData) {
          refreshData()
        }
        break

      case ALLOWED_RENDER_TYPE.UNIT:
        setSortByUnit({ sortBy: sortBy as UnitSearchSortBy, direction })
        if (refreshData) {
          refreshData()
        }
        break
    }
  }

  if (!renderType || !Object.values(ALLOWED_RENDER_TYPE).find((val) => val === renderType)) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" w={[`184px`, `552px`]} minW={[`184px`, `552px`]}>
      <TableContainer minH="72px" id="projectTableReference">
        <Table variant="simple" className="searchTable">
          <Thead zIndex={3} minW="552px" id="projectTable">
            <Tr>
              <Th>
                <Box>
                  {t(`table.projectDetails`)}
                  <ColumnSortFilter
                    currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                    currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                    sortValue={getSortingValue()}
                    onClick={handleSort}
                  />
                </Box>
              </Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      {renderType === ALLOWED_RENDER_TYPE.PROJECT ? <ProjectSearchHeadContent projectResults={projectResults} /> : <UnitSearchHeadContent unitResults={unitResults} />}
    </Flex>
  )
}
