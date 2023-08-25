import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Hide, Image, Spacer, Text, useBreakpointValue } from '@chakra-ui/react'

import headerBanner from '../../../assets/header.jpg'
import headerFeatureLarge from '../../../assets/headerFeatureLarge.svg'
import headerFeatureSmall from '../../../assets/headerFeatureSmall.svg'

import styles from './Header.module.scss'
import { AeonikFono } from '@/styles/fonts'

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
          <Flex
            minW={[`auto`, `685px`]}
            direction={`column`}
            gap={`20px`}
            alignSelf={[`top`, null, `center`]}
            justifyContent={[`center`, null, `flex-start`]}
            margin={[`50px 0px`, null, `5%`]}
            marginLeft={[`20px`, null, `142px`]}
          >
            <Text fontSize={[`lg`, `40px`, `40px`]} maxW="685px" className={styles.headerTitle} fontFamily={AeonikFono.style.fontFamily}>
              {t(`appHeader.title`)}
            </Text>
            <Link as={`button`} variant={`whiteSecondary`} href={`https://www.google.com`}>
              {t(`appHeader.findOutMore`)}
            </Link>
          </Flex>
          <Spacer />
          <Hide below="xs">
            <Flex>
              <Image {...headerFeatureImage} height={`100%`} alt={t(`appHeader.featureImageAltText`)} />
            </Flex>
          </Hide>
        </Flex>
      </Flex>
    </Box>
  )
}

export default AppHeader
