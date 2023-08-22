import { HStack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { useActions } from '@/overmind'
import { useTranslation } from 'react-i18next'
import CompareSubmitButton from '../../atoms/CompareSubmitButton/CompareSubmitButton'
import CompareCloseButton from '../../atoms/CompareCloseButton/CompareCloseButton'

interface ProjectCompareWidgetProps {
  isVisible: boolean
  projects: ProjectSearchResult[]
  onCompare: () => void
  onClose: () => void
}

export const ProjectCompareWidget = (props: ProjectCompareWidgetProps) => {
  const { isVisible, projects, onCompare, onClose } = props
  const { removeProjectFromCompare } = useActions().compareProjects
  const { t } = useTranslation(`search`)
  const maxProjects = 3

  const renderNoSelection = () => {
    return (
      <Text flex={4} fontWeight="500" color="white" fontSize="lg" textAlign={`center`}>
        {t(`projectCompare.addProjectLabel`)}
      </Text>
    )
  }

  const renderSelectedCount = () => {
    return (
      <Text flex={1} fontWeight="500" color="white" fontSize="lg" textAlign={`center`}>
        Selected {projects.length}
      </Text>
    )
  }

  const renderProjectName = (project: ProjectSearchResult) => {
    return (
      <VStack flex={1} height={`100%`} py={`8px`}>
        <CloseIcon alignSelf={`end`} color={`white`} onClick={() => removeProjectFromCompare(project.warehouseProjectId)} />
        <Text fontWeight="500" color="white" fontSize="md" noOfLines={3} px={`30px`} height={`100%`} textAlign={`center`}>
          {project.name}
        </Text>
      </VStack>
    )
  }

  const renderPlaceholderProjectName = () => {
    return (
      <Text flex={1} fontWeight="500" color="white" fontSize="md" px={`8px`}>
        --
      </Text>
    )
  }

  return (
    <HStack
      alignItems="center"
      visibility={isVisible ? `visible` : `hidden`}
      divider={projects.length > 0 ? <StackDivider borderColor={`#B8BEC0`} /> : <></>}
      bg="gray.100"
      position={`fixed`}
      height={`136px`}
      bottom={0}
      left={0}
      width={`100%`}
    >
      {projects.length == 0 ? (
        <>{renderNoSelection()}</>
      ) : (
        <HStack flex={4} divider={<StackDivider borderColor={`#B8BEC0`} />} height={`100%`}>
          {renderSelectedCount()}

          {projects.map((project) => {
            return renderProjectName(project)
          })}

          {Array.from({ length: maxProjects - projects.length }).map((_, __) => {
            return renderPlaceholderProjectName()
          })}
        </HStack>
      )}

      <VStack flex={1}>
        <CompareSubmitButton onClick={onCompare} />
        <CompareCloseButton onClick={onClose} />
      </VStack>
    </HStack>
  )
}
