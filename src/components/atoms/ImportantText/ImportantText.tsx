import { Text, TextProps } from '@chakra-ui/react'

export type ImportantTextProps = TextProps
export const ImportantText = (props: TextProps): React.JSX.Element => {
  const actualProps = {
    ...props,
    fontWeight: props?.fontWeight ?? `500`,
    fontSize: props?.fontSize ?? `40px`,
    color: props?.color ?? `green.600`,
  }

  return (
    <Text as="span" {...actualProps}>
      {props.children}
    </Text>
  )
}
