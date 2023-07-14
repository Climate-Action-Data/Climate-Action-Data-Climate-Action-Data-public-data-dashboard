import { Box, Image } from '@chakra-ui/react'
import headerBanner from './../../assets/header.jpg'

export const Header = (): React.JSX.Element => {
  return (
    <Box>
      <Image alt="CAD Banner" src={headerBanner.src} />
    </Box>
  )
}
