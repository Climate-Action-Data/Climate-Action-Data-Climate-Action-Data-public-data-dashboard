import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const ScrollIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `12px`,
    height: props?.height ?? `13px`,
  }
  return (
    <Icon viewBox="0 0 12 13" {...actualProps}>
      <path
        fill="currentColor"
        d="M5.99953 12.6884L0.345703 7.0346L1.39953 5.98078L5.99953 10.5654L10.5995 5.98078L11.6534 7.0346L5.99953 12.6884ZM5.99953 6.70765L0.345703 1.05383L1.39953 0L5.99953 4.58463L10.5995 0L11.6534 1.05383L5.99953 6.70765Z"
      />
    </Icon>
  )
}
