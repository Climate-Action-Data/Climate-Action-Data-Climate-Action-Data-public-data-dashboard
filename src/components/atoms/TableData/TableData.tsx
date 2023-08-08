import { useTranslation } from 'react-i18next'
import { Text } from '@chakra-ui/react'

interface TableDataProps {
  data: string | number | undefined
}

export const TableData = (props: TableDataProps) => {
  const { t } = useTranslation(`home`)
  if (props.data !== undefined && typeof props.data === `number`) {
    return <>{props.data.toLocaleString()}</>
  }
  if (props.data !== undefined) {
    return <>{props.data}</>
  } else {
    return <Text color="lightGray.500">{t(`noData`)}</Text>
  }
}
