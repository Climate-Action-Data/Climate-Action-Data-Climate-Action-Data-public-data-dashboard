import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import FilterAndSearchTrigger from '@/components/atoms/FilterAndSearchTrigger/FilterAndSearchTrigger'
import { MatchWordIcon } from '@/components/atoms/MatchWordIcon/MatchWordIcon'
import { FilterIcon } from '@/components/atoms/FilterIcon/FilterIcon'
import { VStack } from '@chakra-ui/react'
import UnitSearchBar from '@/components/organisms/UnitSearchBar/UnitSearchBar'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'

const UnitFilterAndSearch = () => {
  const { t } = useTranslation(`search`)
  const [showFilters, setShowFilters] = useState(true)

  const handleOnClick = () => {
    setShowFilters((prevState) => !prevState)
  }

  const renderFilterBar = () => {
    return (
      <>
        <UnitFilterBar />
        <FilterAndSearchTrigger icon={<MatchWordIcon />} label={t(`searchUnitsByKeywords`)} handleOnClick={handleOnClick} />
      </>
    )
  }
  const renderSearchBar = () => {
    return (
      <>
        <UnitSearchBar />
        <FilterAndSearchTrigger icon={<FilterIcon />} label={t(`searchUnitsByFilters`)} handleOnClick={handleOnClick} />
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

export default UnitFilterAndSearch
