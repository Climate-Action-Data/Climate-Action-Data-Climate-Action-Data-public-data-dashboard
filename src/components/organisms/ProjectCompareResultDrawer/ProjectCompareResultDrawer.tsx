import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, HStack, Spacer, Divider, Tr, Table, Td } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { CompareIcon } from '@/components/atoms/CompareIcon/CompareIcon'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { useTranslation } from 'react-i18next'

interface ProjectCompareResultDrawerProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectSearchResult[]
}

export const ProjectCompareResultDrawer = (props: ProjectCompareResultDrawerProps) => {
  const { isOpen, onClose, projects } = props
  const { t } = useTranslation(`search`)

  const renderRow = (header: string, data: string[]) => {
    const maxColumnCount = 3
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

  return (
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen} isFullHeight={false}>
      <DrawerOverlay />
      <DrawerContent height="calc(100vh - 110px)">
        <DrawerHeader>
          <HStack>
            <CompareIcon />
            <Text fontSize={`24px`}>{t(`projectCompare.compareProjects`)}</Text>
            <Spacer />
            <Text marginRight={`16px`}>{t(`projectCompare.exportComparison`)}</Text>
            <CloseIcon onClick={onClose} />
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody py={0}>
          <Table variant={`unstyled`}>
            {renderRow(t(`projectCompare.projectName`), [...projects.map((p) => p.name)])}
            {renderRow(t(`projectCompare.projectId`), [...projects.map((p) => p.id)])}
            {renderRow(t(`projectCompare.developer`), [...projects.map((p) => p.developer)])}
            {renderRow(t(`projectCompare.linkToProject`), [...projects.map((p) => p.link)])}
            {renderRow(t(`projectCompare.standard`), [...projects.map((p) => p.standard)])}
            {renderRow(t(`projectCompare.methodology`), [...projects.map((p) => p.methodology)])}
            {renderRow(t(`projectCompare.sector`), [...projects.map((p) => p.sector)])}
            {renderRow(t(`projectCompare.country`), [...projects.map((p) => p.country ?? ``)])}
            {renderRow(t(`projectCompare.inCountryRegion`), [...projects.map((p) => p.inCountryRegion ?? ``)])}
            {renderRow(t(`projectCompare.projectStatus`), [...projects.map((p) => p.status)])}
            {renderRow(t(`projectCompare.creditingPeriod`), [...projects.map((p) => renderCreditingPeriod(p.creditingPeriodStart, p.creditingPeriodEnd) ?? ``)])}
            {renderRow(t(`projectCompare.annualEstUnits`), [...projects.map((p) => `${p.annualEst?.toLocaleString() ?? 0}`)])}
            {renderRow(t(`projectCompare.totalIssuedUnits`), [...projects.map((p) => `${p.annualIssued?.toLocaleString() ?? 0}`)])}
            {renderRow(t(`projectCompare.totalRetiredUnits`), [...projects.map((p) => `${p.annualRetired?.toLocaleString() ?? 0}`)])}
            {renderRow(t(`projectCompare.totalAvailableUnits`), [...projects.map((p) => `${p.annualAvailable?.toLocaleString() ?? 0}`)])}
          </Table>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
