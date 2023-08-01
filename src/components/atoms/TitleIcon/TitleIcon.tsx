import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const TitleIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `40px`,
    height: props?.height ?? `16px`,
    fill: props?.fill ?? `green.400`,
  }
  return (
    <Icon viewBox="0 0 40 16" {...actualProps}>
      <circle cx="1.42857" cy="1.42857" r="1.42857" fill="currentFill" />
      <circle cx="1.42857" cy="13.8097" r="1.42857" fill="currentFill" />
      <circle cx="13.8094" cy="1.42857" r="1.42857" fill="currentFill" />
      <circle cx="13.8094" cy="13.8097" r="1.42857" fill="currentFill" />
      <circle cx="26.1903" cy="1.42857" r="1.42857" fill="currentFill" />
      <circle cx="26.1903" cy="13.8097" r="1.42857" fill="currentFill" />
      <circle cx="38.5716" cy="1.42857" r="1.42857" fill="currentFill" />
      <circle cx="38.5716" cy="13.8097" r="1.42857" fill="currentFill" />
    </Icon>
  )
}
