import { Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs'

export interface ProjectBreadcrumbProps {
  id: string
  title: string
}

export const ProjectBreadcrumb = (props: ProjectBreadcrumbProps) => {
  const { id, title } = props
  const { t } = useTranslation(`projectDetails`)

  return (
    <Flex id="headerReference" position="sticky" top={`56px`} padding={`16px 24px `} zIndex="docked" backgroundColor="white" width={`100%`}>
      <VStack alignItems="start" flex={1}>
        <BreadCrumbs
          items={[
            { title: t(`projectsBreadCrumb`), link: `/search/projects` },
            { title: `${title}`, link: `/project?id=${id}` },
          ]}
          color="lightGray.700"
        />
      </VStack>
    </Flex>
  )
}
