import { Flex, Box, Text, VStack, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LargeTextWithScroll } from '@/components/atoms/LargeTextWithScroll/LargeTextWithScroll'
import { extractProjectTypeFromString } from '@/utils/TextConverter'
import { ProjectTypeBanner } from '../ProjectTypeBanner/ProjectTypeBanner'

export interface ProjectDetailHeaderProps {
  id: string
  title: string
  description: string
  location: string
  type: string
}

export const ProjectDetailHeader = (props: ProjectDetailHeaderProps) => {
  const { id, title, description, location, type } = props
  const { t } = useTranslation(`projectDetails`)

  return (
    <Flex flexWrap="wrap" gap={6}>
      <Box position="relative" h="336px" flex={1}>
        <ProjectTypeBanner projectType={extractProjectTypeFromString(type)} projectTypeText={type} />
        <VStack
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.8) 33.85%, rgba(17, 17, 17, 0) 100%)"
          borderRadius="8px"
          width="100%"
          color="white"
          alignItems="flex-start"
          gap="8px"
          padding={6}
          bottom={0}
          position="absolute"
        >
          <Text fontSize="lg">{id}</Text>
          <Heading textTransform="uppercase" fontSize={[`16px`, `32px`]}>
            {title}
          </Heading>
          <Text>{location}</Text>
        </VStack>
      </Box>
      <Box maxW="448px">
        <Text fontSize="lg" marginBottom="8px" fontWeight="medium">
          {t(`description`)}
        </Text>
        <LargeTextWithScroll text={`${description}${description}`} />
      </Box>
    </Flex>
  )
}
