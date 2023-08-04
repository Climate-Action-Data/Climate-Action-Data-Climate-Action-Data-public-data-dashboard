import { SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { Validation } from '@/@types/ProjectDetails'
import { ProjectDetailsVerificationList } from '@/components/atoms/ProjectDetailsVerificationList/ProjectDetailsVerificationList'

interface ProjectDetailsVerificationProps {
  validation?: Validation
}

export const ProjectDetailsVerification = (props: ProjectDetailsVerificationProps) => {
  const { validation } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!validation) {
    return <Skeleton height="100px" />
  }

  return (
    <SimpleGrid columns={2} gap="24px">
      <DetailWidget title={t(`verificationHeaders.validationBody`)}>{validation.body ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`verificationHeaders.validationUpdated`)}>{validation.date ? formatDate(validation.date, DateFormats.YYYY_MM_DD) : tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`verificationHeaders.verificationApproach`)}>
        {validation.verifications.length > 0 ? <Text>{validation.verifications[0].approach}</Text> : tHome(`noData`)}
      </DetailWidget>
      <DetailWidget title={t(`verificationHeaders.verificationPeriod`)}>
        <ProjectDetailsVerificationList verificationList={validation.verifications} />
      </DetailWidget>
    </SimpleGrid>
  )
}
