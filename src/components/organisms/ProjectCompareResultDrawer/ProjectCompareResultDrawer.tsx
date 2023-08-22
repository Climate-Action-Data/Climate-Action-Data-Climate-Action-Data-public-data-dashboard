import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, HStack, Spacer, Divider, Tr, Table, Td, Hide, Box, Flex } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { CompareIcon } from '@/components/atoms/CompareIcon/CompareIcon'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { useTranslation } from 'react-i18next'
import ExportComparisonButton from '@/components/atoms/ExportComparisonButton/ExportComparisonButton'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { CompareDataType, ProjectCompareData } from '@/@types/ProjectCompare'

interface ProjectCompareResultDrawerProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectSearchResult[]
}

export const ProjectCompareResultDrawer = (props: ProjectCompareResultDrawerProps) => {
  const { isOpen, onClose, projects } = props
  const { t } = useTranslation(`search`)
  const maxColumnCount = 3

  const renderCreditingPeriod = (startDate: string | undefined, endDate: string | undefined) => {
    if (startDate && endDate) {
      return `${formatDate(startDate, DateFormats.YYYY_MM_DD)} - ${formatDate(endDate, DateFormats.YYYY_MM_DD)}`
    }
    if (startDate) {
      return formatDate(startDate, DateFormats.YYYY_MM_DD)
    }
    if (endDate) {
      return formatDate(endDate, DateFormats.YYYY_MM_DD)
    }
  }

  const projectCompareData: ProjectCompareData[] = [
    { header: t(`projectCompare.projectName`), data: [...projects.map((p) => p.name)] },
    { header: t(`projectCompare.projectId`), data: [...projects.map((p) => p.id)] },
    { header: t(`projectCompare.developer`), data: [...projects.map((p) => p.developer)] },
    { header: t(`projectCompare.linkToProject`), data: [...projects.map((p) => p.link)], type: CompareDataType.URL },
    { header: t(`projectCompare.standard`), data: [...projects.map((p) => p.standard)] },
    { header: t(`projectCompare.methodology`), data: [...projects.map((p) => p.methodology)] },
    { header: t(`projectCompare.sector`), data: [...projects.map((p) => p.sector)] },
    { header: t(`projectCompare.country`), data: [...projects.map((p) => p.country ?? ``)] },
    { header: t(`projectCompare.inCountryRegion`), data: [...projects.map((p) => p.inCountryRegion ?? ``)] },
    { header: t(`projectCompare.projectStatus`), data: [...projects.map((p) => p.status)] },
    { header: t(`projectCompare.creditingPeriod`), data: [...projects.map((p) => renderCreditingPeriod(p.creditingPeriodStart, p.creditingPeriodEnd) ?? ``)] },
    { header: t(`projectCompare.annualEstUnits`), data: [...projects.map((p) => `${p.annualEst?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalIssuedUnits`), data: [...projects.map((p) => `${p.annualIssued?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalRetiredUnits`), data: [...projects.map((p) => `${p.annualRetired?.toLocaleString() ?? 0}`)] },
    { header: t(`projectCompare.totalAvailableUnits`), data: [...projects.map((p) => `${p.annualAvailable?.toLocaleString() ?? 0}`)] },
  ]

  const renderRowMobile = (header: string, data: string[], type: CompareDataType = CompareDataType.STRING) => {
    return (
      <>
        <Flex mt="32px">
          <Text fontSize="14px" flex="1" pb="8px" borderBottom="1px solid" borderColor="lightGray.400" textColor="lightGray.700">
            {header}
          </Text>
        </Flex>

        <Flex mt="16px">
          {data.map((item) => {
            return (
              <>
                <Text flex="1" pr={data.length > 0 ? `12px` : `0px`} fontSize="14px" overflowX="hidden" textColor={type === CompareDataType.STRING ? `lightGray.700` : `blue.main`}>
                  {item}
                </Text>
              </>
            )
          })}
        </Flex>
      </>
    )
  }

  const renderRow = (header: string, data: string[]) => {
    const emptyColumnCount = maxColumnCount - data.length

    return (
      <Tr>
        <Td borderRight={`2px solid #4D5C62`} width={`240px`} textColor={`lightGray.700`} fontSize={`md`} fontWeight={`500`} textAlign="end">
          {header}
        </Td>
        {data.map((item, index) => {
          const isLast = index == data.length - 1

          return (
            <>
              <Td borderRight={isLast ? `0px` : `1px solid #B8BEC0`} width={`400px`} textColor={`lightGray.main`} fontSize={`md`} fontWeight={`400`}>
                {item}
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
    // TODO export project compare
  }

  const renderTableMobile = () => {
    return (
      <Box w="100%" px="24px">
        {projectCompareData.map((item) => {
          return renderRowMobile(item.header, item.data, item.type)
        })}
      </Box>
    )
  }

  const renderTable = () => {
    return (
      <Table variant={`unstyled`}>
        {projectCompareData.map(({ header, data }) => {
          return <>{renderRow(header, data)}</>
        })}
      </Table>
    )
  }

  return (
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen} isFullHeight={false}>
      <DrawerOverlay />
      <DrawerContent height="calc(100vh - 110px)">
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
          <Hide below="sm">{renderTable()}</Hide>
          <Hide above="sm">{renderTableMobile()}</Hide>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
