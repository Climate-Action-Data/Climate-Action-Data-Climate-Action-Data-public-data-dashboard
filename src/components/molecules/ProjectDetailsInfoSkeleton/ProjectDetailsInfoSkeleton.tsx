import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Stack, StackDivider, SimpleGrid, Skeleton, Flex } from '@chakra-ui/react'

export const ProjectDetailsInfoSkeleton = () => {
  const { t } = useTranslation(`projectDetails`)

  return (
    <Stack divider={<StackDivider />} spacing="24px">
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget asBox title={t(`detailsHeaders.standard`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.methodology`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.developer`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.link`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.sector`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.type`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.status`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.statusUpdated`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
      </SimpleGrid>
      <Flex>
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget asBox title={t(`detailsHeaders.availableUnits`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
          <DetailWidget asBox title={t(`detailsHeaders.issuances`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
          <DetailWidget asBox title={t(`detailsHeaders.creditingPeriod`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
        </SimpleGrid>
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget asBox title={t(`detailsHeaders.retirememts`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
          <DetailWidget asBox title={t(`detailsHeaders.estimatedUnits`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
          <DetailWidget asBox title={t(`detailsHeaders.unitMetric`)}>
            <Skeleton height={`20px`} />
          </DetailWidget>
        </SimpleGrid>
      </Flex>
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget asBox title={t(`detailsHeaders.ndcCoverage`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.correspodinglyAdjusted`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget asBox title={t(`detailsHeaders.tags`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.coBenefits`)}>
          <Skeleton height={`20px`} />
        </DetailWidget>
      </SimpleGrid>
    </Stack>
  )
}
