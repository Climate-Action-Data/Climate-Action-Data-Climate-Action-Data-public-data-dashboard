import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Flex } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'

interface SearchButtonProps {
  isResultsPage?: boolean
  onClick: () => void
}

const SearchButton: FC<SearchButtonProps> = (props) => {
  const { isResultsPage, onClick } = props
  const { t } = useTranslation(`search`)

  const generateLabel = () => {
    if (isResultsPage) {
      return t(`applyFilters`)
    }
    return (
      <>
        {t(`search`)}
        <SearchIcon width={`16px`} height={`16px`} marginLeft={`4px`} />
      </>
    )
  }

  const handleOnClick = () => {
    onClick()
  }

  return (
    <Button
      variant={`accentPrimary32`}
      padding={`8px 16px`}
      width={`max-content`}
      _hover={{ backgroundColor: `#24BD63` }}
      _active={{ backgroundColor: `#1B8E4A` }}
      onClick={handleOnClick}
      fontSize={`16px`}
      fontWeight={`medium`}
    >
      <Flex alignItems={`center`}>{generateLabel()}</Flex>
    </Button>
  )
}
export default SearchButton
