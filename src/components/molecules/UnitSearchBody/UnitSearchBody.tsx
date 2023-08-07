import { Flex, TableContainer } from '@chakra-ui/react'
import { useAppState } from '@/overmind'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { UnitSearchBodyHeader } from '@/components/atoms/UnitSearchBodyHeader/UnitSearchBodyHeader'
import { ProjectSearchBodyContent } from '@/components/atoms/ProjectSearchBodyContent/ProjectSearchBodyContent'

interface UnitSearchBodyProps {
  renderType?: string
}

export const UnitSearchBody = (props: UnitSearchBodyProps) => {
  const { renderType } = props
  const { projectResults } = useAppState().projectResult
  if (!renderType || !Object.values(ALLOWED_RENDER_TYPE).find((val) => val === renderType)) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" overflow="hidden">
      <UnitSearchBodyHeader />
      <TableContainer id="multiscroll">
        <ProjectSearchBodyContent projectResults={projectResults} />
      </TableContainer>
    </Flex>
  )
}
