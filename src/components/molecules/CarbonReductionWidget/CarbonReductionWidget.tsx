import { CarbonReductionSector } from '@/components/atoms/CarbonReductionSector/CarbonReductionSector'
import { CarbonReductionStandard } from '@/components/atoms/CarbonReductionStandard/CarbonReductionStandard'
import { ImportantText } from '@/components/atoms/ImportantText/ImportantText'
import { SectorPieChart } from '@/components/atoms/SectorPieChart/SectorPieChart'
import { useActions, useAppState } from '@/overmind'
import { Box, Flex, Text, Skeleton, Stack, Divider, Center, SkeletonCircle } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
export const CarbonReductionWidget: FC = (): React.JSX.Element => {
  const { carbonReduction } = useAppState().analytics
  const { getCarbonReduction } = useActions().analytics

  const colorChart = [`green.600`, `green.700`, `green.800`, `lightGray.500`]

  useEffect(() => {
    getCarbonReduction()
  }, [])

  if (!carbonReduction?.data) {
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
              <ImportantText>{carbonReduction.data.activeProjects}</ImportantText>
              <Text fontWeight="500">Active Projects</Text>
            </Box>
          </Center>
          <Divider marginY={`20px`} />
          <Flex textAlign={`center`}>
            <Box marginRight={`5px`} flex={1}>
              <Box>
                <ImportantText>{carbonReduction.data.totalReduction}</ImportantText>
                <Text as="span" fontSize="sm">
                  M MtCO2
                </Text>
              </Box>
            </Box>
            <Text fontWeight="500">Total Reduction (YTD)</Text>
            <Box marginLeft={`5px`} flex={1}>
              <Box>
                <ImportantText color="green.700">{carbonReduction.data.annualEstReduction}</ImportantText>
                <Text as="span" fontSize="sm">
                  M MtCO2
                </Text>
              </Box>
              <Text fontWeight="500">Annual Est. Reduction</Text>
            </Box>
          </Flex>
          <Divider marginY={`20px`} />
          <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
            <SectorPieChart colorChart={colorChart} data={carbonReduction.data.sectors.map((sect) => ({ value: sect.value, label: sect.title }))} />
          </Text>
          <CarbonReductionSector
            colorChart={colorChart}
            data={[
              { value: 40, label: `Renewable Energy` },
              { value: 24, label: `Waste Disposal` },
              { value: 19, label: `Energy Efficiency` },
              { value: 17, label: `Others` },
            ]}
          />
          <Divider marginY={`20px`} />
          <Text as="h1" fontSize="lg" fontWeight="600" textAlign={`center`}>
            Standard
          </Text>
          <CarbonReductionStandard vcs={74} gcc={15} eco={10} />
        </Stack>
      </Box>
    )
  }
}
