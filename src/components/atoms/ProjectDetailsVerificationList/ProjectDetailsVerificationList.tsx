import { DateFormats } from '@/@types/DateFormats'
import { Verification } from '@/@types/ProjectDetails'
import { formatDate } from '@/utils/DateFormat'
import { Box, Button, Hide, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ProjectDetailsVerificationListProps {
  verificationList: Verification[]
}

export const ProjectDetailsVerificationList = (props: ProjectDetailsVerificationListProps) => {
  const { verificationList } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`ome`)

  if (verificationList.length === 0) {
    return <Text>{tHome(`noData`)}</Text>
  }

  const elementToRender = isExpanded ? verificationList.length : 1

  const renderVerificationList = () => {
    const verificationListToRender = []
    for (let i = 0; i < elementToRender; i++) {
      verificationListToRender.push(
        <Text key={`${verificationList[i].startDate}-${i}`}>
          {formatDate(verificationList[i].startDate, DateFormats.YYYY_MM_DD)} - {formatDate(verificationList[i].endDate, DateFormats.YYYY_MM_DD)}
        </Text>,
      )
    }
    return verificationListToRender
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box>
      {renderVerificationList()}
      <Hide below="md">
        <Button data-testid="verification-expand" onClick={handleExpand} variant="underlinedLink">
          {isExpanded ? t(`viewLess`) : t(`viewMore`)}
        </Button>
      </Hide>
    </Box>
  )
}
