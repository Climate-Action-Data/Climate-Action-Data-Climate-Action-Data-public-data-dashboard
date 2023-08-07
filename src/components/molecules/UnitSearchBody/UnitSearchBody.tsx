import { Flex, TableContainer } from '@chakra-ui/react'
import { useAppState } from '@/overmind'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { UnitSearchBodyHeader } from '@/components/atoms/UnitSearchBodyHeader/UnitSearchBodyHeader'
import { UnitSearchBodyContent } from '@/components/atoms/UnitSearchBodyContent/UnitSearchBodyContent'

interface UnitSearchBodyProps {
  renderType?: string
}

export const UnitSearchBody = (props: UnitSearchBodyProps) => {
  const { renderType } = props
  const { unitResults } = useAppState().unitResult
  if (!renderType || !Object.values(ALLOWED_RENDER_TYPE).find((val) => val === renderType)) {
    throw new Error(`This page should only be rendered in UnitProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" overflow="hidden">
      <UnitSearchBodyHeader />
      <TableContainer id="multiScroll">
        <UnitSearchBodyContent unitResults={unitResults} />
      </TableContainer>
    </Flex>
  )
}
