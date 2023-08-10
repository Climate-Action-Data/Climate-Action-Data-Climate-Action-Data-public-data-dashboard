import { NoDataScreen } from '@/components/atoms/NoDataScreen/NoDataScreen'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const ProjectDocuments = () => {
  const { t } = useTranslation(`projectDetails`)
  return (
    <Container padding={0} display="flex" variant="cardSectionNoMargin">
      <Box minW="100%" borderRight="1px solid" borderRightColor="lightGray.400">
        <Box borderBottom="2px solid" borderBottomColor="lightGray.700">
          <Flex justifyContent="space-between" padding="0 24px" alignItems="center" height="56px">
            <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
              {t(`documents.name`)}
            </Heading>
            <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
              {t(`documents.updated`)}
            </Heading>
          </Flex>
        </Box>
        <Box overflowY="scroll" height="329px" maxH="329px">
          <NoDataScreen message={t(`noDocuments`)} />
        </Box>
      </Box>
    </Container>
  )
}
