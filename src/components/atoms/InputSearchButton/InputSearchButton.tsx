import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Flex } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'

interface InputSearchButtonProps {
  isResultsPage?: boolean
  onClick: () => void
}

const InputSearchButton: FC<InputSearchButtonProps> = (props) => {
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
      h="1.75rem"
      py="0px"
      px="12px"
      width="max-content"
      borderRadius={`32px`}
      backgroundColor={`white`}
      _hover={{ backgroundColor: `#EDEFEF` }}
      onClick={handleOnClick}
      fontSize="14px"
      fontWeight="medium"
      data-testid="search-header-button"
    >
      <Flex alignItems={`center`}>{generateLabel()}</Flex>
    </Button>
  )
}
export default InputSearchButton
