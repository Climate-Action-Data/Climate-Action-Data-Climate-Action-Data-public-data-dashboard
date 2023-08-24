import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
export const NoProjectsWatchlist = () => {
  const { t } = useTranslation(`watchlist`)

  return (
    <VStack
      paddingTop={[`20px`, `80px`]}
      flexDirection="column"
      borderRadius="12px"
      maxW="600px"
      padding="80px 0 "
      minW={[`100%`, `600px`]}
      border="1px dashed"
      borderColor="gray.700"
      textAlign={`center`}
    >
      <Text>{t(`noProjectWatchlist`)}</Text>
    </VStack>
  )
}
