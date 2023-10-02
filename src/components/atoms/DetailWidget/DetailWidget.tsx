import { BoxProps, Box, Text } from '@chakra-ui/react'

interface DetailWidgetProps extends BoxProps {
  title: string
  asBox?: boolean
}

const extractDesignProps = (props: DetailWidgetProps): Partial<BoxProps> => {
  const designProps: Partial<DetailWidgetProps> = { ...props }
  if (designProps.title !== undefined) {
    delete designProps.title
  }
  if (designProps.asBox !== undefined) {
    delete designProps.asBox
  }
  return designProps as BoxProps
}

export const DetailWidget = (props: DetailWidgetProps): React.JSX.Element => {
  const { title, children, asBox } = props
  const designProps = extractDesignProps(props)

  return (
    <Box {...designProps}>
      <Text marginBottom="4px" color="lightGray.600">
        {title}
      </Text>
      {asBox ? <Box>{children}</Box> : <Text>{children}</Text>}
    </Box>
  )
}
