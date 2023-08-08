import { Flex, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { useState } from 'react'
import { AnchorSection } from '@/@types/ProjectDetails'
import { ProjectDetailsAnchor } from '@/components/atoms/ProjectDetailsAnchor/ProjectDetailsAnchor'

export interface ProjectDetailHeaderProps {
  id: string
  title: string
}

export const ProjectDetailHeader = (props: ProjectDetailHeaderProps) => {
  const { id, title } = props
  const { t } = useTranslation(`projectDetails`)

  const [activeAnchor, setActiveAnchor] = useState(AnchorSection.PROJECT_DETAILS)

  return (
    <Flex id="headerReference" position="sticky" top={`56px`} minH={`100px`} padding={[`16px 24px 4px 24px`]} zIndex="docked" backgroundColor="white" width={`100%`}>
      <VStack alignItems="start" flex={1}>
        <BreadCrumbs
          items={[
            { title: t(`projectsBreadCrumb`), link: `/search/projects` },
            { title: `${title}`, link: `/project/${id}` },
          ]}
          color="lightGray.700"
        />
        <HStack spacing={`16px`} marginTop={`24px`}>
          {Object.values(AnchorSection).map((anchor) => (
            <ProjectDetailsAnchor key={anchor} id={anchor} title={t(`sectionHeaders.${anchor}`)} isSelected={anchor == activeAnchor} onClick={() => setActiveAnchor(anchor)} />
          ))}
        </HStack>
      </VStack>
    </Flex>
  )
}
