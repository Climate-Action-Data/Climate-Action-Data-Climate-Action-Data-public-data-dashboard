import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PlusIcon } from '../PlusIcon/PlusIcon'

export interface NoWatchlistScreenProps {
  onClick?: () => void
}

export const NoWatchlistScreen = (props: NoWatchlistScreenProps) => {
  const { t } = useTranslation(`watchlist`)
  const { onClick } = props

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
    >
      <Text>{t(`noWatchlist`)}</Text>
      <Button data-testid="no-watchlist-create-button" onClick={onClick} rightIcon={<PlusIcon />} variant={`blueFilled`}>
        {t(`newWatchlist`)}
      </Button>
    </VStack>
  )
}
