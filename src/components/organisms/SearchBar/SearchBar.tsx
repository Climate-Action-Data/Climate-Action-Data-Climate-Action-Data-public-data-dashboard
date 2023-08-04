import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { Button, Container, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'

const SearchBar = () => {
  const { t } = useTranslation(`search`)
  const [searchInput, setSearchInput] = useState(``)

  const handleOnClear = () => {
    setSearchInput(``)
  }

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const handleOnSearch = () => {
    console.log(`searching for ${searchInput}`)
  }

  return (
    <Container variant={`searchBar`}>
      <Flex>
        <InputGroup variant={`searchInput`}>
          {searchInput.length !== 0 && (
            <InputRightElement>
              <CloseIcon onClick={handleOnClear} />
            </InputRightElement>
          )}
          <Input placeholder={t(`searchProjectsByKeywordsPlaceholder`)} value={searchInput} onChange={handleInputOnChange} />
        </InputGroup>
        <Button rightIcon={<SearchIcon width={`16px`} height={`16px`} />} variant={`accentPrimary32`} onClick={handleOnSearch} marginLeft={`8px`}>
          {t(`search`)}
        </Button>
      </Flex>
    </Container>
  )
}

export default SearchBar
