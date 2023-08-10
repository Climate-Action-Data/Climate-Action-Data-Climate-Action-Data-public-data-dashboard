import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { VStack } from '@chakra-ui/react'

import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'
import { MatchWordIcon } from '@/components/atoms/MatchWordIcon/MatchWordIcon'
import { FilterIcon } from '@/components/atoms/FilterIcon/FilterIcon'
import FilterAndSearchTrigger from '@/components/atoms/FilterAndSearchTrigger/FilterAndSearchTrigger'
import ProjectUnitSearchBar from '@/components/organisms/ProjectUnitSearchBar/ProjectUnitSearchBar'

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
        <FilterAndSearchTrigger icon={<MatchWordIcon />} label={t(`searchProjectsByKeywords`)} handleOnClick={handleOnClick} />
      </>
    )
  }
  const renderSearchBar = () => {
    return (
      <>
        <ProjectUnitSearchBar isProjectSearch={true} />
        <FilterAndSearchTrigger icon={<FilterIcon />} label={t(`searchProjectsByFilters`)} handleOnClick={handleOnClick} />
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
