import { TitleWithIcon, TitleWithIconProps } from '@/components/atoms/TitleWithIcon/TitleWithIcon'
import { Box, BoxProps, Flex } from '@chakra-ui/react'

interface CardSectionProps extends BoxProps {
  displaySectionTitle?: boolean
  sectionTitle?: TitleWithIconProps
}
export const CardSection = (props: CardSectionProps): React.JSX.Element => {
  const { displaySectionTitle, sectionTitle } = props
  return (
    <Box>
      {displaySectionTitle && sectionTitle && <TitleWithIcon title={sectionTitle.title} hideIcon={sectionTitle.hideIcon} iconColor={sectionTitle.iconColor} />}
      {props.children && (
        <Flex flexWrap="wrap" gap={6} paddingLeft={[0, `52px`]}>
          {props.children}
        </Flex>
      )}
    </Box>
  )
}
