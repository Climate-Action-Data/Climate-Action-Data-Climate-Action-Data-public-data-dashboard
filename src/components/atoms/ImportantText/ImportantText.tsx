import { AeonikFono } from '@/styles/fonts'
import { Text, TextProps } from '@chakra-ui/react'

export interface ImportantTextProps extends TextProps {
  isNumeric?: boolean
}
export const ImportantText = (props: ImportantTextProps): React.JSX.Element => {
  const actualProps = {
    ...props,
    fontWeight: props?.fontWeight ?? `500`,
    isNumeric: props?.isNumeric ?? false,
    fontSize: props?.fontSize ?? `40px`,
    color: props?.color ?? `green.600`,
  }

  return (
    <Text fontFamily={actualProps.isNumeric ? AeonikFono.style.fontFamily : `inherit`} as="span" {...actualProps}>
      {props.children}
    </Text>
  )
}
