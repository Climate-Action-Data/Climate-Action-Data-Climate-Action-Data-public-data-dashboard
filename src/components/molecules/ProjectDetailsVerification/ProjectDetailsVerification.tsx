import { GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { Validation } from '@/@types/ProjectDetails'
import { ProjectDetailsVerificationList } from '@/components/atoms/ProjectDetailsVerificationList/ProjectDetailsVerificationList'

interface ProjectDetailsVerificationProps {
  validation?: Validation
}
const DEFAULT_COLUMN_MOBILE = 1
const DEFAULT_COLUMN_WEB = 4

export const ProjectDetailsVerification = (props: ProjectDetailsVerificationProps) => {
  const { validation } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!validation) {
    return <Skeleton height="100px" />
  }

  return (
    <>
      <SimpleGrid columns={1} gap="24px">
        <DetailWidget title={t(`verificationHeaders.validationUpdated`)}>{validation.date ? formatDate(validation.date, DateFormats.YYYY_MM_DD) : tHome(`noData`)}</DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={[DEFAULT_COLUMN_MOBILE, DEFAULT_COLUMN_WEB]} gap="24px">
        <GridItem colSpan={1}>
          <DetailWidget title={t(`verificationHeaders.verificationApproach`)}>
            {validation.verifications.length > 0 ? validation.verifications[0].approach : tHome(`noData`)}
          </DetailWidget>
        </GridItem>
        <GridItem colSpan={3}>
          <DetailWidget asBox title={t(`verificationHeaders.verificationPeriod`)}>
            <ProjectDetailsVerificationList verificationList={validation.verifications} />
          </DetailWidget>
        </GridItem>
      </SimpleGrid>
    </>
  )
}
