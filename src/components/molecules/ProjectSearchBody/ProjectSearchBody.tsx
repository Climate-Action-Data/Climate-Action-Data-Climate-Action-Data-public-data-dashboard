import { Flex, TableContainer } from '@chakra-ui/react'
import { useAppState } from '@/overmind'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { ProjectSearchBodyHeader } from '@/components/atoms/ProjectSearchBodyHeader/ProjectSearchBodyHeader'
import { ProjectSearchBodyContent } from '@/components/atoms/ProjectSearchBodyContent/ProjectSearchBodyContent'

interface ProjectSearchBodyProps {
  renderType?: string
}

export const ProjectSearchBody = (props: ProjectSearchBodyProps) => {
  const { renderType } = props
  const { projectResults } = useAppState().projectResult
  if (renderType !== ALLOWED_RENDER_TYPE) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" overflow="hidden">
      <ProjectSearchBodyHeader />
      <TableContainer id="multiScroll">
        <ProjectSearchBodyContent projectResults={projectResults} />
      </TableContainer>
    </Flex>
  )
}
