import { SimpleGrid, Skeleton, Text, Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'

interface ProjectDetailsVerificationProps {
  validation?: Validation
}

export const ProjectDetailsVerification = (props: ProjectDetailsVerificationProps) => {
  const { validation } = props
  const { t } = useTranslation(`projectDetails`)
  if (!validation) {
    return <Skeleton height="100px" />
  }

  return (
    <SimpleGrid columns={2} gap="24px">
      <DetailWidget title={t(`verificationHeaders.validationBody`)}>{validation.body}</DetailWidget>
      <DetailWidget title={t(`verificationHeaders.validationUpdated`)}>{validation.date ? formatDate(validation.date, DateFormats.YYYY_MM_DD) : `--`}</DetailWidget>
      <DetailWidget title={t(`verificationHeaders.verificationApproach`)}>
        {validation.verifications.length > 0 && <Text>{validation.verifications[0].approach}</Text>}
      </DetailWidget>
      <DetailWidget title={t(`verificationHeaders.verificationPeriod`)}>
        {validation.verifications.length > 0 && (
          <HStack>
            <Text>
              {formatDate(validation.verifications[0].startDate, DateFormats.YYYY_MM_DD)} - {formatDate(validation.verifications[0].endDate, DateFormats.YYYY_MM_DD)}
            </Text>
            <Button variant="blackLink">{t(`viewHistory`)}</Button>
          </HStack>
        )}
      </DetailWidget>
    </SimpleGrid>
  )
}
