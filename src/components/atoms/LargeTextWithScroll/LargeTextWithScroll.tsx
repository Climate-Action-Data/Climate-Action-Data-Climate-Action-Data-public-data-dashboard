import { Box, Text, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { ScrollIcon } from '../ScrollIcon/ScrollIcon'
import { useTranslation } from 'react-i18next'

export interface LargeTextWithScrollProps {
  text: string
  maxCharacter?: number
  maxH?: string
}

const DEFAULT_MAX_CHARACTER = 850
const DEFAULT_MAX_HEIGHT = `304px`

export const LargeTextWithScroll = (props: LargeTextWithScrollProps): React.JSX.Element => {
  const [isScrolling, setIsScrolling] = useState(false)
  const { t } = useTranslation(`projectDetails`)

  const { text, maxCharacter, maxH } = {
    ...props,
    maxCharacter: props?.maxCharacter ?? DEFAULT_MAX_CHARACTER,
    maxH: props?.maxH ?? DEFAULT_MAX_HEIGHT,
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const isAtTop = target.scrollTop === 0
    setIsScrolling(!isAtTop)
  }

  if (text.length <= maxCharacter) {
    return (
      <Box>
        <Text>{text}</Text>
      </Box>
    )
  } else {
    return (
      <Box data-testid="large-text-scroll" onScroll={handleScroll} position="relative" maxH={maxH} paddingRight="10px" overflowY={`scroll`}>
        <Text>{text}</Text>
        <Flex
          display={isScrolling ? `none` : `flex`}
          flexDirection="column"
          alignItems="center"
          justifyContent="end"
          position="absolute"
          minH="60px"
          bottom={0}
          gap="4px"
          w="100%"
          background="linear-gradient(0deg, #F8FAFA 40.85%, rgba(248, 250, 250, 0.5) 110%)"
        >
          <Box color="lightGray.700" fontSize="12px">
            {t(`scroll`)}
          </Box>
          <ScrollIcon />
        </Flex>
      </Box>
    )
  }
}
