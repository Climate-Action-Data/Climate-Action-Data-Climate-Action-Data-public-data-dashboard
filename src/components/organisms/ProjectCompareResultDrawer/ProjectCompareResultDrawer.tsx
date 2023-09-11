import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, HStack, Spacer, Divider, Tr, Table, Td, Hide, Box, Flex, Link } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { CompareIcon } from '@/components/atoms/CompareIcon/CompareIcon'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { useTranslation } from 'react-i18next'
import ExportComparisonButton from '@/components/atoms/ExportComparisonButton/ExportComparisonButton'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { CompareDataType, ProjectCompareData } from '@/@types/ProjectCompare'
import { formatCreditingPeriod } from '@/utils/TextConverter'
import { AeonikFono } from '@/styles/fonts'
import { compareProjectCsvHeaders, convertCompareProjectToCSV, createAndDownloadCsv } from '@/utils/CsvHelper'
import { CSVExportFilenames } from '@/@types/CSV'

interface ProjectCompareResultDrawerProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectSearchResult[]
}

export const ProjectCompareResultDrawer = (props: ProjectCompareResultDrawerProps) => {
  const { isOpen, onClose, projects } = props
  const { t } = useTranslation(`search`)
  const maxColumnCount = 3

  const projectCompareData: ProjectCompareData[] = [
    { header: t(`projectCompare.projectName`), data: [...projects.map((p) => p.name)], type: CompareDataType.TEXT_HIGHLIGHTED },
    { header: t(`projectCompare.projectId`), data: [...projects.map((p) => p.id)] },
    { header: t(`projectCompare.developer`), data: [...projects.map((p) => p.developer)] },
    { header: t(`projectCompare.linkToProject`), data: [...projects.map((p) => p.link)], type: CompareDataType.URL },
    { header: t(`projectCompare.registry`), data: [...projects.map((p) => p.standard)] },
    { header: t(`projectCompare.methodology`), data: [...projects.map((p) => p.methodology)] },
    { header: t(`projectCompare.sector`), data: [...projects.map((p) => p.sector)] },
    { header: t(`projectCompare.country`), data: [...projects.map((p) => p.country ?? ``)] },
    { header: t(`projectCompare.inCountryRegion`), data: [...projects.map((p) => p.inCountryRegion ?? ``)] },
    { header: t(`projectCompare.projectStatus`), data: [...projects.map((p) => p.status)] },
    { header: t(`projectCompare.creditingPeriod`), data: [...projects.map((p) => formatCreditingPeriod(p.creditingPeriodStart, p.creditingPeriodEnd) ?? ``)] },
    { header: t(`projectCompare.annualEstUnits`), data: [...projects.map((p) => `${p.annualEst?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalIssuedUnits`), data: [...projects.map((p) => `${p.annualIssued?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalRetiredUnits`), data: [...projects.map((p) => `${p.annualRetired?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalAvailableUnits`), data: [...projects.map((p) => `${p.annualAvailable?.toLocaleString() ?? 0}`)] },
  ]

  const fontStyleFromType = (type: CompareDataType) => {
    const fontWeight = type === CompareDataType.TEXT_HIGHLIGHTED ? `500` : `400`
    const fontFamily = type === CompareDataType.NUMBER ? AeonikFono.style.fontFamily : `inherit`

    return { fontFamily, fontWeight }
  }

  const renderLink = (link: string) => {
    return (
      <Link href={link} isExternal>
        {link}
      </Link>
    )
  }

  const renderRowMobile = (header: string, data: string[], type: CompareDataType = CompareDataType.TEXT) => {
    const textDataColor = type === CompareDataType.URL ? `blue.main` : `gray.700`

    return (
      <>
        <Flex mt="32px">
          <Text fontSize="14px" flex="1" pb="4px" borderBottom="1px solid" borderColor="lightGray.400" textColor="lightGray.700">
            {header}
          </Text>
        </Flex>

        <Flex mt="16px">
          {data.map((item) => {
            return (
              <>
                <Text flex="1" pr={data.length > 0 ? `12px` : `0px`} fontSize="14px" overflowX="hidden" textColor={textDataColor} {...fontStyleFromType(type)}>
                  {type === CompareDataType.URL ? renderLink(item) : item}
                </Text>
              </>
            )
          })}
        </Flex>
      </>
    )
  }

  const renderRow = (header: string, data: string[], type: CompareDataType = CompareDataType.TEXT) => {
    const emptyColumnCount = maxColumnCount - data.length
    const textDataColor = type === CompareDataType.URL ? `blue.main` : `gray.700`

    return (
      <Tr>
        <Td borderRight={`2px solid`} borderColor={`lightGray.700`} width={`240px`} textColor={`lightGray.700`} fontSize={`md`} fontWeight={`500`} textAlign="end">
          {header}
        </Td>

        {data.map((item, index) => {
          const isLast = index == data.length - 1

          return (
            <>
              <Td borderRight={isLast ? `0px` : `1px solid`} borderColor="lightGray.400" width={`400px`} textColor={textDataColor} fontSize={`md`} {...fontStyleFromType(type)}>
                {type === CompareDataType.URL ? renderLink(item) : item}
              </Td>
            </>
          )
        })}

        {Array.from({ length: emptyColumnCount }).map((_) => {
          return (
            <>
              <Td borderRight={`0px`} textColor={`lightGray.main`} fontSize={`md`} fontWeight={`400`} maxW={`400px`}></Td>
            </>
          )
        })}
      </Tr>
    )
  }

  const handleExportProjectCompare = () => {
    const headers = compareProjectCsvHeaders(t)
    const csv = projects.map((project) => convertCompareProjectToCSV(project)).join(`\n`)
    const data = `${headers}\n${csv}`

    createAndDownloadCsv(new Blob([data]), CSVExportFilenames.PROJECT_COMPARE)
  }

  const renderTableMobile = () => {
    return (
      <Box w="100%" px="24px">
        {projectCompareData.map(({ header, data, type }) => {
          return renderRowMobile(header, data, type)
        })}
      </Box>
    )
  }

  const renderTable = () => {
    return (
      <Table variant={`unstyled`}>
        {projectCompareData.map(({ header, data, type }) => {
          return <>{renderRow(header, data, type)}</>
        })}
      </Table>
    )
  }

  return (
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen} isFullHeight={false}>
      <DrawerOverlay />
      <DrawerContent height={[`calc(100vh - 56px)`, `calc(100vh - 110px)`]} borderTopRadius={16}>
        <DrawerHeader>
          <HStack>
            <CompareIcon />
            <Text fontSize={`24px`}>{t(`projectCompare.compareProjects`)}</Text>
            <Spacer />
            <Hide above="sm">
              <DownloadIcon onClick={handleExportProjectCompare} />
            </Hide>
            <Hide below="sm">
              <ExportComparisonButton onClick={handleExportProjectCompare} />
            </Hide>
            <CloseIcon onClick={onClose} />
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody p={0}>
          <Hide below="md">{renderTable()}</Hide>
          <Hide above="md">{renderTableMobile()}</Hide>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
