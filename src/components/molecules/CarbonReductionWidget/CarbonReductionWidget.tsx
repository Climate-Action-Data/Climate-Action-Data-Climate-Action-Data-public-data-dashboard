import { CarbonReductionSector } from '@/components/atoms/CarbonReductionSector/CarbonReductionSector'
import { CarbonReductionStandard } from '@/components/atoms/CarbonReductionStandard/CarbonReductionStandard'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { useActions, useAppState, useEffects } from '@/overmind'
import { convertToMtCO2 } from '@/utils/UnitConverter'
import { Box, Flex, Text, Skeleton, Stack, Divider, Center, SkeletonCircle } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const DEFAULT_SECTOR_NUMBER = 4

export const CarbonReductionWidget: FC = (): React.JSX.Element => {
  const { carbonReduction, carbonMapDataFiltered } = useAppState().analytics
  const { getCarbonReduction } = useActions().analytics
  const effects = useEffects().analytics
  const { t } = useTranslation(`home`)

  const colorChart = [`green.800`, `green.700`, `green.600`, `lightGray.500`]

  useEffect(() => {
    if (!carbonReduction.carbonMapData) {
      effects.getCarbonReduction().then((carbonData) => {
        getCarbonReduction(carbonData)
      })
    }
  }, [])

  if (carbonReduction.carbonMapData === undefined && carbonMapDataFiltered === undefined) {
    return (
      <Box w={{ md: `328px` }} maxW={{ md: `328px` }} data-testid="loading-indicator" flex={1}>
        <Stack gap={0}>
          <Center>
            <Box width={`50%`}>
              <Skeleton marginBottom={`5px`} height="40px" />
              <Skeleton height="20px" />
            </Box>
          </Center>
          <Divider marginY={`16px`} />
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
          <Divider marginY={`16px`} />
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
          <Divider marginY={`16px`} />
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
        <Flex width={{ md: `328px` }} alignItems="center">
          <Text color={`lightGray.600`}>{t(`selectedDataNotAvailable`)}</Text>
        </Flex>
      )
    } else {
      const top4Percentage = [...carbonMapDataFiltered.sectors].sort((a, b) => b.average - a.average).slice(0, DEFAULT_SECTOR_NUMBER)

      return (
        <Box width={{ md: `328px` }}>
          <Stack gap={0}>
            <Center>
              <Box textAlign={`center`} width={`50%`}>
                <ImportantText>{carbonMapDataFiltered.activeProjects.toLocaleString()}</ImportantText>
                <Text fontWeight="500">{t(`carbonReduction.activeProjects`)}</Text>
              </Box>
            </Center>
            <Divider marginY={`16px`} />
            <Flex flexWrap="wrap" gap="10px" textAlign={`center`}>
              <Box minW={[`80%`, `auto`]} flex={1}>
                <Box>
                  <ImportantText as="p">{convertToMtCO2(carbonMapDataFiltered.totalReductions, true).toLocaleString()}</ImportantText>
                  <Text fontSize="sm">{t(`carbonReduction.MtCO2`)}</Text>
                </Box>
                <Text fontWeight="500">{t(`carbonReduction.totalReduction`)}</Text>
              </Box>
              <Box marginLeft={`5px`} flex={1}>
                <Box>
                  <ImportantText as="p" color="green.700">
                    {convertToMtCO2(carbonMapDataFiltered.estimatedReductions, true).toLocaleString()}
                  </ImportantText>
                  <Text fontSize="sm">{t(`carbonReduction.MtCO2`)}</Text>
                </Box>
                <Text fontWeight="500">{t(`carbonReduction.annualReduction`)}</Text>
              </Box>
            </Flex>
            <Divider marginY={`16px`} />
            <Text as="h1" fontSize="lg" fontWeight="500" textAlign={`center`}>
              {t(`carbonReduction.sector`)}
            </Text>
            {carbonMapDataFiltered.sectors.length > 0 ? (
              <CarbonReductionSector colorChart={colorChart} data={top4Percentage} />
            ) : (
              <Text textAlign="center" color={`lightGray.600`}>
                {t(`selectedDataNotAvailable`)}
              </Text>
            )}

            <Divider marginY={`16px`} />
            <Text as="h1" fontSize="lg" fontWeight="500" textAlign={`center`}>
              {t(`carbonReduction.registry`)}
            </Text>
            {carbonMapDataFiltered.standards.length > 0 ? (
              <CarbonReductionStandard data={carbonMapDataFiltered.standards} />
            ) : (
              <Text textAlign="center" color={`lightGray.600`}>
                {t(`selectedDataNotAvailable`)}
              </Text>
            )}
          </Stack>
        </Box>
      )
    }
  }
}
