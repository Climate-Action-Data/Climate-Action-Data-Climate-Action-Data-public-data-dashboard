import { Icon, IconProps } from '@chakra-ui/react'
import { FC } from 'react'

export const EllipseIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `16px`,
    height: props?.height ?? `16px`,
  }
  return (
    <Icon viewBox="0 0 16 16" {...actualProps}>
      <ellipse fill="currentColor" cx="8" cy="8" rx="3" ry="3" />
    </Icon>
  )
}
