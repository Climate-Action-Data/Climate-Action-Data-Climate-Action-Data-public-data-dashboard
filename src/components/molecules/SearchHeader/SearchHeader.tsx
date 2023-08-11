import { ChangeEvent, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { extractPageFromUrl, extractTitleFromUrl } from '@/utils/TextConverter'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { useActions, useAppState } from '@/overmind'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'
import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'

export const SearchHeader = () => {
  const { keywordSearch } = useAppState().searchFilters
  const { setKeywordSearch } = useActions().searchFilters
  const currentPath = usePathname()
  const currentTitle = extractTitleFromUrl(currentPath)
  const { t } = useTranslation(`search`)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pattern = searchParams.get(ESearchParams.KEYWORD) ?? keywordSearch
  //TODO: refactor search to use state and not url params
  useEffect(() => {
    if (pattern) {
      if (searchParams.get(ESearchParams.KEYWORD) !== keywordSearch && keywordSearch !== ``) {
        const searchParams = new URLSearchParams()
        searchParams.append(ESearchParams.KEYWORD, keywordSearch)
        router.push(`/search/${extractPageFromUrl(currentPath)}?${searchParams}`)
      }
    }
  }, [])

  const handleOnSearch = () => {
    const searchParams = new URLSearchParams()
    searchParams.append(ESearchParams.KEYWORD, keywordSearch)
    setKeywordSearch(searchParams.get(ESearchParams.KEYWORD) ?? ``)
    router.push(`/search/${extractPageFromUrl(currentPath)}?${searchParams}`)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywordSearch(event.target.value)
  }

  const generateFilterBar = () => {
    if (currentPath === `/search/projects`) {
      return <ProjectFilterBar isResultsPage />
    } else if (currentPath === `/search/units`) {
      return <UnitFilterBar isResultsPage />
    }
  }

  return (
    <Flex id="headerReference" position="sticky" top={`56px`} zIndex="docked" padding="16px 24px" minH="184px" color="white" backgroundColor="gray.900" width="100%">
      <VStack alignItems="start" flex={1}>
        {currentPath && <BreadCrumbs items={[{ title: currentTitle, link: currentPath }]} />}
        <HStack w={`100%`} justifyContent={`space-between`}>
          <Box>
            <Heading>{currentTitle}</Heading>
          </Box>
          <Box>
            <InputGroup size="md">
              <Input pr="4.5rem" type={`text`} placeholder="Search" value={keywordSearch} onChange={handleOnChange} />
              <InputRightElement width="4.5rem">
                <Button colorScheme="white" variant="brandPrimary" h="1.75rem" size="sm" onClick={handleOnSearch} data-testid={`search-header-button`}>
                  {t(`search`)}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </HStack>
        {generateFilterBar()}
      </VStack>
    </Flex>
  )
}
