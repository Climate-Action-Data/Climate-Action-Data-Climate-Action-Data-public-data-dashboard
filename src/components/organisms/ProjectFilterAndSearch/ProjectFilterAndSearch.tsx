import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'
import { Button, VStack } from '@chakra-ui/react'
import { MatchWordIcon } from '@/components/atoms/MatchWordIcon/MatchWordIcon'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FilterIcon } from '@/components/atoms/FilterIcon/FilterIcon'
import ProjectSearchBar from '@/components/organisms/ProjectSearchBar/ProjectSearchBar'

const ProjectFilterAndSearch = () => {
  const { t } = useTranslation(`search`)
  const [showFilters, setShowFilters] = useState(true)

  const handleOnClick = () => {
    setShowFilters((prevState) => !prevState)
  }

  const renderFilterBar = () => {
    return (
      <>
        <ProjectFilterBar />
        <Button rightIcon={<MatchWordIcon />} variant={`linkText`} fontWeight={`medium`} padding={0} height={`min-content`} onClick={handleOnClick}>
          {t(`searchProjectsByKeywords`)}
        </Button>
      </>
    )
  }
  const renderSearchBar = () => {
    return (
      <>
        <ProjectSearchBar />
        <Button rightIcon={<FilterIcon />} variant={`linkText`} fontWeight={`medium`} padding={0} height={`min-content`} onClick={handleOnClick}>
          {t(`searchProjectsByFilters`)}
        </Button>
      </>
    )
  }

  return (
    <VStack width={`100%`} gap={`32px`}>
      {showFilters && renderFilterBar()}
      {!showFilters && renderSearchBar()}
    </VStack>
  )
}

export default ProjectFilterAndSearch
