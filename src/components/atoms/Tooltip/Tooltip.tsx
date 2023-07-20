import { Box, BoxProps } from '@chakra-ui/react'

export type TooltipProps = BoxProps

export const Tooltip = (props: TooltipProps): React.JSX.Element => {
  const actualProps = {
    ...props,
    padding: props?.padding ?? `2`,
    bg: props?.bg ?? `gray.400`,
    color: props?.color ?? `white`,
    fontSize: props?.fontSize ?? `sm`,
  }

  const { children } = props

  return <Box {...actualProps}>{children}</Box>
}
