import { CarbonReductionSector } from '@/components/atoms/CarbonReductionSector/CarbonReductionSector'
import { CarbonReductionStandard } from '@/components/atoms/CarbonReductionStandard/CarbonReductionStandard'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { useActions, useAppState } from '@/overmind'
import { Box, Flex, Text, Skeleton, Stack, Divider, Center, SkeletonCircle } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const CarbonReductionWidget: FC = (): React.JSX.Element => {
  const { carbonReduction, carbonMapDataFiltered } = useAppState().analytics
  const { getCarbonReduction } = useActions().analytics
  const { t } = useTranslation(`home`)

  const colorChart = [`green.600`, `green.700`, `green.800`, `lightGray.500`]

  useEffect(() => {
    if (!carbonReduction.carbonMapData) {
      getCarbonReduction()
    }
  }, [])

  if (carbonMapDataFiltered === undefined) {
    return (
      <Box flex={1} minW={`400px`}>
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
    return (
      <Box minW={`400px`}>
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
                <ImportantText>{carbonMapDataFiltered.totalReductions}</ImportantText>
                <Text as="span" fontSize="sm">
                  M MtCO2
                </Text>
              </Box>
              <Text fontWeight="500">{t(`carbonReduction.totalReduction`)}</Text>
            </Box>
            <Box marginLeft={`5px`} flex={1}>
              <Box>
                <ImportantText props={{ color: `green.700` }}>{carbonMapDataFiltered.estimatedReductions}</ImportantText>
                <Text as="span" fontSize="sm">
                  M MtCO2
                </Text>
              </Box>
              <Text fontWeight="500">{t(`carbonReduction.annualReduction`)}</Text>
            </Box>
          </Flex>
          <Divider marginY={`20px`} />
          <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
            {t(`carbonReduction.sector`)}
          </Text>
          <CarbonReductionSector colorChart={colorChart} data={carbonMapDataFiltered.sectors} />
          <Divider marginY={`20px`} />
          <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
            {t(`carbonReduction.standard`)}
          </Text>
          <CarbonReductionStandard
            vcs={carbonMapDataFiltered.standards[0].average}
            gcc={carbonMapDataFiltered.standards[0].average}
            eco={carbonMapDataFiltered.standards[0].average}
          />
        </Stack>
      </Box>
    )
  }
}
