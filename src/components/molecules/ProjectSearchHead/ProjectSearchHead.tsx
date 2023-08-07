import { useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { Flex, TableContainer, Table, Thead, Tr, Th, Box } from '@chakra-ui/react'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { ProjectSearchHeadContent } from '@/components/atoms/ProjectSearchHeadContent/ProjectSearchHeadContent'
import { UnitSearchHeadContent } from '@/components/atoms/UnitSearchHeadContent/UnitSearchHeadContent'

interface ProjectSearchHeadProps {
  renderType?: string
}

export const ProjectSearchHead = (props: ProjectSearchHeadProps) => {
  const { renderType } = props
  const { projectResults } = useAppState().projectResult
  const { unitResults } = useAppState().unitResult
  const { t } = useTranslation(`search`)

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
                  <ColumnSortFilter />
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
