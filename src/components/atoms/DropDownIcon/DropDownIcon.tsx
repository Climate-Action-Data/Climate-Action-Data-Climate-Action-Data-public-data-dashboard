import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const DropDownIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `8px`,
    height: props?.height ?? `4px`,
  }
  return (
    <Icon viewBox="0 0 8 4" {...actualProps}>
      <path d="M3.99911 3.9034L0.191406 0.0957031H7.80681L3.99911 3.9034Z" fill="currentColor" />
    </Icon>
  )
}
