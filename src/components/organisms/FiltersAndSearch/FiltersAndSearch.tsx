import FilterBar from '@/components/organisms/FilterBar/FilterBar'
import { Button, VStack } from '@chakra-ui/react'
import { MatchWordIcon } from '@/components/atoms/MatchWordIcon/MatchWordIcon'
import { useTranslation } from 'react-i18next'

const FiltersAndSearch = () => {
  const { t } = useTranslation(`search`)
  return (
    <VStack width={`100%`} gap={`32px`}>
      <FilterBar />
      <Button rightIcon={<MatchWordIcon />} variant={`linkText`} fontWeight={`medium`} padding={0} height={`min-content`}>
        {t(`searchProjectsByKeywords`)}
      </Button>
    </VStack>
  )
}

export default FiltersAndSearch
