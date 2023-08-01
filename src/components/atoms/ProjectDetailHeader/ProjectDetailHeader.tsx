import { Flex, Box, Image, Text, VStack, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export interface ProjectDetailHeaderProps {
  id: string
  title: string
  description: string
  location: string
}

export const ProjectDetailHeader = (props: ProjectDetailHeaderProps) => {
  const { id, title, description, location } = props
  const { t } = useTranslation(`projectDetails`)

  return (
    <Flex gap={6}>
      <Box position="relative" h="336px" w="920px">
        <Image borderRadius="8px" alt="PLACEHOLDER" src={`https://placehold.co/920x336`} h="336px" w="920px" objectFit={`contain`} />
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
      <Box flex={1}>
        <Text fontSize="lg" fontWeight="medium">
          {t(`description`)}
        </Text>
        <Text>{description}</Text>
      </Box>
    </Flex>
  )
}
