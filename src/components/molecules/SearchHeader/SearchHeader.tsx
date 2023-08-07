import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { extractTitleFromUrl } from '@/utils/TextConverter'
import { Flex, Heading, Box, VStack, HStack, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const SearchHeader = () => {
  const currentPath = usePathname()
  const currentTitle = extractTitleFromUrl(currentPath)
  const { t } = useTranslation(`search`)

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
              <Input pr="4.5rem" type={`text`} placeholder="Search" />
              <InputRightElement width="4.5rem">
                <Button colorScheme="white" variant="brandPrimary" h="1.75rem" size="sm">
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
