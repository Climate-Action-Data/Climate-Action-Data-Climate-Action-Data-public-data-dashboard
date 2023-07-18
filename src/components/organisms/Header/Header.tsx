import { Box, Image } from '@chakra-ui/react'
import headerBanner from './../../../assets/header.jpg'
import { useTranslation } from 'react-i18next'

export const Header = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)

  return (
    <Box>
      <Image alt={t(`images.bannerImage`)} src={headerBanner.src} />
    </Box>
  )
}
