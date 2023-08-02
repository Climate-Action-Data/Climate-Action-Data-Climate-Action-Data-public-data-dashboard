import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const SortDownIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `8px`,
    height: props?.height ?? `4px`,
  }
  return (
    <Icon viewBox="0 0 8 4" {...actualProps}>
      <path d="M3.99911 3.8077L0.191406 0H7.80681L3.99911 3.8077Z" fill="currentColor" />
    </Icon>
  )
}
