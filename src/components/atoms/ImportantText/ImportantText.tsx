import { Text, TextProps } from '@chakra-ui/react'

export type ImportantTextProps = TextProps

export const ImportantText = (props: ImportantTextProps): React.JSX.Element => {
  const actualProps = {
    ...props,
    fontWeight: props?.fontWeight ?? `500`,
    fontSize: props?.fontSize ?? `40px`,
    color: props?.color ?? `green.600`,
  }

  const { children } = props

  return (
    <Text as="span" {...actualProps}>
      {children}
    </Text>
  )
}
