import { HStack, Heading } from '@chakra-ui/react'
import { TitleIcon } from '../TitleIcon/TitleIcon'

export interface TitleWithIconProps {
  title: string
  hideIcon?: boolean
  iconColor?: string
}

export const TitleWithIcon = (props: TitleWithIconProps) => {
  const { title, hideIcon, iconColor } = props
  return (
    <HStack gap="12px">
      {!hideIcon && <TitleIcon fill={iconColor ?? undefined} />}
      <Heading color="gray.400" lineHeight="40px" fontWeight="medium" fontSize={[`16px`, `24px`]}>
        {title}
      </Heading>
    </HStack>
  )
}
