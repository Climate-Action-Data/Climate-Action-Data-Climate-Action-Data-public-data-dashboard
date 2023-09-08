import { Box, Flex, HStack, Spacer, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs'
import { AnchorSection } from '../../../@types/ProjectDetails'
import { ProjectDetailsAnchor } from '../ProjectDetailsAnchor/ProjectDetailsAnchor'
import { useState } from 'react'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { useSearchParams } from 'next/navigation'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { SearchFlow } from '@/@types/Search'
import { generateProjectUrl } from '@/utils/RequestHelpers'

export interface ProjectBreadcrumbProps {
  id: string
  title: string
  displayProjectNav?: boolean
  onExport?: () => void
}

export const ProjectBreadcrumb = (props: ProjectBreadcrumbProps) => {
  const actualProps = {
    ...props,
    displayProjectNav: props.displayProjectNav ?? false,
  }

  const searchParams = useSearchParams()
  const searchFlow = (searchParams.get(ESearchParams.SEARCH_FLOW) as SearchFlow) ?? SearchFlow.PROJECT

  const { id, title, displayProjectNav, onExport } = actualProps

  const { t } = useTranslation(`projectDetails`)

  const [activeAnchor, setActiveAnchor] = useState(AnchorSection.PROJECT_DETAILS)

  const getBreadCrumbItems = () => {
    return [
      searchFlow === SearchFlow.UNIT ? { title: t(`unitsBreadCrumb`), link: `/search/units` } : { title: t(`projectsBreadCrumb`), link: `/search/projects` },
      { title: `${title}`, link: generateProjectUrl(id, searchFlow) },
    ]
  }

  return (
    <Flex
      id="headerReference"
      flexDirection={`column`}
      position="sticky"
      top={`56px`}
      minH={displayProjectNav ? `100px` : `48px`}
      px={`24px`}
      pt={`16px`}
      pb={displayProjectNav ? `4px` : `16px`}
      zIndex="docked"
      backgroundColor="white"
      width={`100%`}
    >
      <VStack alignItems="start" flex={1}>
        <BreadCrumbs items={getBreadCrumbItems()} color="lightGray.700" />
      </VStack>
      {displayProjectNav && (
        <HStack overflowX="auto" spacing={`16px`} marginTop={`24px`} className="hide-scrollbar" position={`relative`}>
          {Object.values(AnchorSection).map((anchor) => (
            <ProjectDetailsAnchor key={anchor} id={anchor} title={t(`sectionHeaders.${anchor}`)} isSelected={anchor == activeAnchor} onClick={() => setActiveAnchor(anchor)} />
          ))}
          <Spacer />
          <Box position="sticky" right="0" bg={`white`} zIndex="1">
            <DownloadIcon alignSelf="center" onClick={onExport} />
          </Box>
        </HStack>
      )}
    </Flex>
  )
}
