import { ChangeEvent, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { extractPageFromUrl, extractTitleFromUrl } from '@/utils/TextConverter'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { useActions } from '@/overmind'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'
import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'

export const SearchHeader = () => {
  const [searchPattern, setSearchPattern] = useState(``)
  const { setKeywordSearch } = useActions().searchFilters
  const currentPath = usePathname()
  const currentTitle = extractTitleFromUrl(currentPath)
  const { t } = useTranslation(`search`)
  const router = useRouter()
  const extractedPage = extractPageFromUrl(currentPath)

  //TODO: refactor search to use state and not url params

  useEffect(() => {
    if (searchPattern && searchPattern !== ``) {
      router.push(`/search/${extractedPage}`)
    }
  }, [])

  const handleOnSearch = () => {
    setKeywordSearch(searchPattern)
    router.push(`/search/${extractedPage}`)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(event.target.value)
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter`) {
      handleOnSearch()
    }
  }

  const generateFilterBar = () => {
    if (currentPath === `/search/projects`) {
      return <ProjectFilterBar isResultsPage />
    } else if (currentPath === `/search/units`) {
      return <UnitFilterBar isResultsPage />
    }
  }

  return (
    <Flex id="headerReference" position="sticky" top={`56px`} zIndex="docked" padding="16px 24px" minH={[`430px`, `184px`]} color="white" backgroundColor="gray.900" width="100%">
      <VStack alignItems="start" flex={1}>
        {currentPath && <BreadCrumbs items={[{ title: currentTitle, link: currentPath }]} />}
        <HStack w={`100%`} justifyContent={`space-between`}>
          <Box>
            <Heading>{currentTitle}</Heading>
          </Box>
          <Box>
            <InputGroup size="md">
              <Input pr="4.5rem" data-testid="search-input-enter" type={`text`} placeholder="Search" value={searchPattern} onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
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
