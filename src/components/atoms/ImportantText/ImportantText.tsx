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
  const designProps: Partial<ImportantTextProps> = actualProps
  if (designProps.isNumeric !== undefined) {
    delete designProps.isNumeric
  }

  return (
    <Text fontFamily={actualProps.isNumeric ? AeonikFono.style.fontFamily : `inherit`} as="span" {...designProps}>
      {props.children}
    </Text>
  )
}
