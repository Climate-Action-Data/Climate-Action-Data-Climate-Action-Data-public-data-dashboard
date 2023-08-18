import { Flex, TableContainer } from '@chakra-ui/react'
import { useAppState } from '@/overmind'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { ProjectSearchBodyHeader } from '@/components/atoms/ProjectSearchBodyHeader/ProjectSearchBodyHeader'
import { ProjectSearchBodyContent } from '@/components/atoms/ProjectSearchBodyContent/ProjectSearchBodyContent'

interface ProjectSearchBodyProps {
  renderType?: string
  refreshData?: () => void
}

export const ProjectSearchBody = (props: ProjectSearchBodyProps) => {
  const { renderType, refreshData } = props
  const { projectResults } = useAppState().projectResult
  if (!renderType || !Object.values(ALLOWED_RENDER_TYPE).find((val) => val === renderType)) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" overflow="hidden">
      <ProjectSearchBodyHeader refreshData={refreshData} />
      <TableContainer id="multiScroll">
        <ProjectSearchBodyContent projectResults={projectResults} />
      </TableContainer>
    </Flex>
  )
}
