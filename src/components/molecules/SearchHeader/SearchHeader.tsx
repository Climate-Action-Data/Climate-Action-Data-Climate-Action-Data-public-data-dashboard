import { ChangeEvent, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { extractTitleFromUrl } from '@/utils/TextConverter'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'

export const SearchHeader = () => {
  const [searchInput, setSearchInput] = useState(``)
  const currentPath = usePathname()
  const currentTitle = extractTitleFromUrl(currentPath)
  const { t } = useTranslation(`search`)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pattern = searchParams.get(`keyword`) ?? ``

  useEffect(() => {
    setSearchInput(pattern)
  }, [])

  const handleOnSearch = () => {
    const searchParams = new URLSearchParams()
    searchParams.append(`keyword`, searchInput)
    router.push(`/search/projects?${searchParams}`)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
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
              <Input pr="4.5rem" type={`text`} placeholder="Search" value={searchInput} onChange={handleOnChange} />
              <InputRightElement width="4.5rem">
                <Button colorScheme="white" variant="brandPrimary" h="1.75rem" size="sm" onClick={handleOnSearch} data-testid={`search-header-button`}>
                  {t(`search`)}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </HStack>
      </VStack>
    </Flex>
  )
}
