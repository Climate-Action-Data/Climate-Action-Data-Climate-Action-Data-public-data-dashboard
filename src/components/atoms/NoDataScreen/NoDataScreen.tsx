import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface NoDataScreenProps {
  message?: string
}

export const NoDataScreen = (props: NoDataScreenProps) => {
  const { message } = props
  const { t } = useTranslation(`home`)
  return (
    <Flex color="lightGray.600" justifyContent="center" alignItems="center" w="100%" h="100%">
      {message ?? t(`noData`)}
    </Flex>
  )
}
