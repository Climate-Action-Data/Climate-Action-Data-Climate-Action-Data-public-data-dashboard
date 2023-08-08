import { Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs'

export interface ProjectDetailHeaderProps {
  id: string
  title: string
}

export const ProjectDetailHeader = (props: ProjectDetailHeaderProps) => {
  const { id, title } = props
  const { t } = useTranslation(`projectDetails`)

  return (
    <Flex id="headerReference" position="sticky" top={`56px`} padding={`16px 24px `} zIndex="docked" backgroundColor="white" width={`100%`}>
      <VStack alignItems="start" flex={1}>
        <BreadCrumbs
          items={[
            { title: t(`projectsBreadCrumb`), link: `/search/projects` },
            { title: `${title}`, link: `/project/${id}` },
          ]}
          color="lightGray.700"
        />
      </VStack>
    </Flex>
  )
}
