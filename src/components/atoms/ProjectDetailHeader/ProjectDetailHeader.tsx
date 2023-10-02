import { extractProjectTypeFromString } from '@/utils/TextConverter'
import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LargeTextWithScroll } from '../LargeTextWithScroll/LargeTextWithScroll'
import { ProjectTypeBanner } from '../ProjectTypeBanner/ProjectTypeBanner'

export interface ProjectDetailHeaderProps {
  topTitle?: string
  mainTitle?: string
  subTitle?: string
  description?: string
  type?: string
  isExpanded: boolean
}

export const ProjectDetailHeader = (props: ProjectDetailHeaderProps) => {
  const { topTitle, mainTitle, description, subTitle, type, isExpanded } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  return (
    <Flex flexWrap="wrap" gap={6}>
      <Box position="relative" h={isExpanded ? `336px` : `200px`} flex={1}>
        <ProjectTypeBanner projectType={extractProjectTypeFromString(type)} projectTypeText={type ?? tHome(`noData`)} isExpanded={isExpanded} />
        <VStack
          background={`linear-gradient(0deg, rgba(0, 0, 0, 0.8) 33.85%, rgba(17, 17, 17, 0) 100%)`}
          borderRadius="8px"
          width="100%"
          color="white"
          alignItems="flex-start"
          gap="8px"
          padding={6}
          bottom={0}
          position="absolute"
        >
          <Text fontSize="20px">{topTitle}</Text>
          <Heading textTransform="uppercase" fontSize={[`16px`, `32px`]} style={{ fontWeight: `400` }}>
            {mainTitle}
          </Heading>
          <Text>{subTitle}</Text>
        </VStack>
      </Box>
      {description && (
        <Box maxW="448px">
          <Text fontSize="lg" marginBottom="8px" fontWeight="medium">
            {t(`description`)}
          </Text>
          <LargeTextWithScroll text={`${description}${description}`} />
        </Box>
      )}
    </Flex>
  )
}
