import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const SortUpIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `8px`,
    height: props?.height ?? `4px`,
  }
  return (
    <Icon viewBox="0 0 8 4" {...actualProps}>
      <path d="M3.99911 0.1923L0.191406 4H7.80681L3.99911 0.1923Z" fill="currentColor" />
    </Icon>
  )
}
