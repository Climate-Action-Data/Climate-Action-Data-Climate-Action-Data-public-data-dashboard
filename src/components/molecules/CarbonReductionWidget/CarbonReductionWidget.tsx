import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Center, Divider, Flex, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react'

import { CarbonReductionSector } from '@/components/atoms/CarbonReductionSector/CarbonReductionSector'
import { CarbonReductionStandard } from '@/components/atoms/CarbonReductionStandard/CarbonReductionStandard'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { useActions, useAppState, useEffects } from '@/overmind'
import { convertToMtCO2 } from '@/utils/UnitConverter'

const DEFAULT_SECTOR_NUMBER = 4

export const CarbonReductionWidget: FC = (): React.JSX.Element => {
  const { carbonReduction, carbonMapDataFiltered } = useAppState().analytics
  const { getCarbonReduction } = useActions().analytics
  const effects = useEffects().analytics
  const { t } = useTranslation(`home`)

  const colorChart = [`green.600`, `green.700`, `green.800`, `lightGray.500`]

  useEffect(() => {
    if (!carbonReduction.carbonMapData) {
      effects.getCarbonReduction().then((carbonData) => {
        getCarbonReduction(carbonData)
      })
    }
  }, [])

  if (carbonReduction.carbonMapData === undefined && carbonMapDataFiltered === undefined) {
    return (
      <Box data-testid="loading-indicator" flex={1}>
        <Stack>
          <Center>
            <Box width={`50%`}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
          </Center>
          <Divider marginY={`20px`} />
          <Flex>
            <Box marginRight={`5px`} flex={1}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
            <Box marginLeft={`5px`} flex={1}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
          </Flex>
          <Divider marginY={`20px`} />
          <Skeleton height="20px" />
          <Flex>
            <SkeletonCircle marginRight={`10px`} size="160" />
            <Flex flexDirection={`column`} justifyContent={`space-evenly`} flex={1}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Flex>
          </Flex>
          <Divider marginY={`20px`} />
          <Flex>
            <Box marginRight={`5px`} flex={1}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
            <Box marginLeft={`5px`} flex={1}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
            <Box marginLeft={`5px`} flex={1}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
          </Flex>
        </Stack>
      </Box>
    )
  } else {
    if (carbonMapDataFiltered === undefined) {
      return (
        <Flex alignItems="center">
          <Text color={`lightGray.600`}> {t(`selectedDataNotAvailable`)}</Text>
        </Flex>
      )
    } else {
      const top4Percentage = [...carbonMapDataFiltered.sectors].sort((a, b) => b.average - a.average).slice(0, DEFAULT_SECTOR_NUMBER)

      return (
        <Box>
          <Stack>
            <Center>
              <Box textAlign={`center`} width={`50%`}>
                <ImportantText>{carbonMapDataFiltered.activeProjects}</ImportantText>
                <Text fontWeight="500">{t(`carbonReduction.activeProjects`)}</Text>
              </Box>
            </Center>
            <Divider marginY={`20px`} />
            <Flex textAlign={`center`}>
              <Box marginRight={`5px`} flex={1}>
                <Box>
                  <ImportantText>{convertToMtCO2(carbonMapDataFiltered.totalReductions, true)}</ImportantText>
                  <Text as="span" fontSize="sm">
                    MtCO2
                  </Text>
                </Box>
                <Text fontWeight="500">{t(`carbonReduction.totalReduction`)}</Text>
              </Box>
              <Box marginLeft={`5px`} flex={1}>
                <Box>
                  <ImportantText color="green.700">{convertToMtCO2(carbonMapDataFiltered.estimatedReductions, true)}</ImportantText>
                  <Text as="span" fontSize="sm">
                    MtCO2
                  </Text>
                </Box>
                <Text fontWeight="500">{t(`carbonReduction.annualReduction`)}</Text>
              </Box>
            </Flex>
            <Divider marginY={`20px`} />
            <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
              {t(`carbonReduction.sector`)}
            </Text>
            {carbonMapDataFiltered.sectors.length > 0 ? (
              <CarbonReductionSector colorChart={colorChart} data={top4Percentage} />
            ) : (
              <Text color={`lightGray.600`}> {t(`selectedDataNotAvailable`)}</Text>
            )}

            <Divider marginY={`20px`} />
            <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
              {t(`carbonReduction.standard`)}
            </Text>
            {carbonMapDataFiltered.standards.length > 0 ? (
              <CarbonReductionStandard data={carbonMapDataFiltered.standards} />
            ) : (
              <Text color={`lightGray.600`}> {t(`selectedDataNotAvailable`)}</Text>
            )}
          </Stack>
        </Box>
      )
    }
  }
}
