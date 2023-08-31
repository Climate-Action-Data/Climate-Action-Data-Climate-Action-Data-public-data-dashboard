import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { Button, Container, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import React, { ChangeEvent, FC, useState } from 'react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { useRouter } from 'next/navigation'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { useActions } from '@/overmind'

interface ProjectUnitSearchBarProp {
  isProjectSearch?: boolean
}

const ProjectUnitSearchBar: FC<ProjectUnitSearchBarProp> = (props) => {
  const { isProjectSearch } = props
  const { setKeywordSearch } = useActions().searchFilters
  const [searchInput, setSearchInput] = useState(``)
  const router = useRouter()
  const { t } = useTranslation(`search`)

  const handleOnClear = () => {
    setSearchInput(``)
  }

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const handleOnSearch = () => {
    const searchParams = new URLSearchParams()
    searchParams.append(ESearchParams.KEYWORD, searchInput)

    setKeywordSearch(searchInput)

    if (isProjectSearch) {
      router.push(`/search/projects`)
    } else {
      router.push(`/search/units`)
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter`) {
      handleOnSearch()
    }
  }

  return (
    <Container variant={`searchBar`} width={[`100%`, null, null, `888px`]}>
      <Flex>
        <InputGroup variant={`searchInput`}>
          {searchInput.length !== 0 && (
            <InputRightElement>
              <CloseIcon onClick={handleOnClear} data-testid={`search-bar-clear`} />
            </InputRightElement>
          )}
          <Input
            placeholder={isProjectSearch ? t(`searchProjectsByKeywordsPlaceholder`) : t(`searchUnitsByKeywordsPlaceholder`)}
            value={searchInput}
            onChange={handleInputOnChange}
            onKeyDown={handleOnKeyDown}
          />
        </InputGroup>
        <Button rightIcon={<SearchIcon width={`16px`} height={`16px`} />} variant={`accentPrimary32`} data-testid={`search-bar-search`} onClick={handleOnSearch} marginLeft={`8px`}>
          {t(`search`)}
        </Button>
      </Flex>
    </Container>
  )
}

export default ProjectUnitSearchBar
