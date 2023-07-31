import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Image, Spacer, Text, useBreakpointValue } from '@chakra-ui/react'

import headerBanner from '../../../assets/header.jpg'
import headerFeatureLarge from '../../../assets/headerFeatureLarge.svg'
import headerFeatureSmall from '../../../assets/headerFeatureSmall.svg'

import styles from './Header.module.scss'

const AppHeader: FC = () => {
  const { t } = useTranslation(`home`)
  const headerFeatureImage = useBreakpointValue({
    base: { src: headerFeatureSmall.src, padding: `40% 20% 10% 10%` },
    sm: { src: headerFeatureLarge.src, padding: `8%` },
  })

  return (
    <Box>
      <Flex backgroundImage={headerBanner.src} aspectRatio={[`1.5`, `2`, `3`, `4`, `5`]} className={styles.backgroundImage}>
        <Box width={[`100vw`, `60vw`]} className={styles.backgroundGradient} />
        <Flex className={styles.headerContents}>
          <Flex direction={`column`} gap={`20px`} alignSelf={[`top`, null, `center`]} padding={[`50px 20px`, null, `5%`]} paddingLeft={[`20px`, null, `142px`]}>
            <Text fontSize={[`lg`, `xl`, `3xl`]} className={styles.headerTitle}>
              {t(`appHeader.title`)}
            </Text>
            <Link as={`button`} variant={`whiteSecondary`} href={`https://www.google.com`}>
              {t(`appHeader.findOutMore`)}
            </Link>
          </Flex>
          <Spacer />
          <Flex>
            <Image {...headerFeatureImage} height={`100%`} alt={t(`appHeader.featureImageAltText`)} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default AppHeader
