import { TitleWithIcon, TitleWithIconProps } from '@/components/atoms/TitleWithIcon/TitleWithIcon'
import { Box, BoxProps, Flex } from '@chakra-ui/react'

interface CardSectionProps extends BoxProps {
  displaySectionTitle?: boolean
  sectionTitle?: TitleWithIconProps
}

const extractDesignProps = (props: CardSectionProps): Partial<BoxProps> => {
  const designProps: Partial<CardSectionProps> = { ...props }

  if (designProps.displaySectionTitle !== undefined) {
    delete designProps.displaySectionTitle
  }
  if (designProps.sectionTitle !== undefined) {
    delete designProps.sectionTitle
  }
  if (designProps.children !== undefined) {
    delete designProps.children
  }

  return designProps as BoxProps
}

export const CardSection = (props: CardSectionProps): React.JSX.Element => {
  const { displaySectionTitle, sectionTitle } = props
  const designProps = extractDesignProps(props)

  return (
    <Box {...designProps}>
      {displaySectionTitle && sectionTitle && <TitleWithIcon title={sectionTitle.title} hideIcon={sectionTitle.hideIcon} iconColor={sectionTitle.iconColor} />}
      {props.children && (
        <Flex color="gray.800" flexWrap="wrap" gap={6} paddingLeft={[0, `52px`]}>
          {props.children}
        </Flex>
      )}
    </Box>
  )
}
