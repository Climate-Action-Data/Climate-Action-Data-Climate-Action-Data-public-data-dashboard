import { BoxProps, Box, Text } from '@chakra-ui/react'

interface DetailWidgetProps extends BoxProps {
  title: string
  asBox?: boolean
}

export const DetailWidget = (props: DetailWidgetProps): React.JSX.Element => {
  const { title, children, asBox } = props

  return (
    <Box>
      <Text color="lightGray.600">{title}</Text>
      {asBox ? <Box>{children}</Box> : <Text>{children}</Text>}
    </Box>
  )
}
