import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, HStack, Spacer, Divider, Tr, Table, Td } from '@chakra-ui/react'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { CompareIcon } from '@/components/atoms/CompareIcon/CompareIcon'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'

interface ProjectCompareResultDrawerProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectSearchResult[]
}

export const ProjectCompareResultDrawer = (props: ProjectCompareResultDrawerProps) => {
  const { isOpen, onClose, projects } = props

  const renderRow = (header: string, data: string[]) => {
    const maxColumnCount = 3
    const emptyColumnCount = maxColumnCount - data.length

    return (
      <>
        <Td borderRight={`2px solid #4D5C62`} width={`240px`} textColor={`lightGray.700`} fontSize={`md`} fontWeight={`500`} maxW={`240px`} minW={`100%`} textAlign="end">
          {header}
        </Td>
        {data.map((item, index) => {
          const isLast = index == data.length - 1

          return (
            <>
              <Td borderRight={isLast ? `0px` : `1px solid #B8BEC0`} width={`400px`} key={index} textColor={`lightGray.main`} fontSize={`md`} fontWeight={`400`}>
                {item}
              </Td>
            </>
          )
        })}
        {Array.from({ length: emptyColumnCount }).map((_, index) => {
          return (
            <>
              <Td borderRight={`0px`} key={index} textColor={`lightGray.main`} fontSize={`md`} fontWeight={`400`} maxW={`400px`}></Td>
            </>
          )
        })}
      </>
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
            <Text fontSize={`24px`}>Compare Projects</Text>
            <Spacer />
            <CloseIcon onClick={onClose} />
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody py={0}>
          <Table variant={`unstyled`}>
            <Tr>{renderRow(`PROJECT NAME`, [...projects.map((p) => p.name)])}</Tr>
            <Tr>{renderRow(`PROJECT ID`, [...projects.map((p) => p.id)])}</Tr>
            <Tr>{renderRow(`DEVELOPER`, [...projects.map((p) => p.developer)])}</Tr>
            <Tr>{renderRow(`LINK TO PROJECT`, [...projects.map((p) => p.id)])}</Tr>
            <Tr>{renderRow(`STANDARD`, [...projects.map((p) => p.standard)])}</Tr>
            <Tr>{renderRow(`METHODOLOGY`, [...projects.map((p) => p.methodology)])}</Tr>
            <Tr>{renderRow(` SECTOR`, [...projects.map((p) => p.sector)])}</Tr>
            <Tr>{renderRow(`COUNTRY`, [...projects.map((p) => p.country ?? ``)])}</Tr>
            <Tr>{renderRow(`IN-COUNTRY REGION`, [...projects.map((p) => p.country ?? ``)])}</Tr>
            <Tr>{renderRow(`PROJECT STATUS`, [...projects.map((p) => p.status)])}</Tr>
            <Tr>{renderRow(`CREDITING PERIOD`, [...projects.map((p) => renderCreditingPeriod(p.creditingPeriodStart, p.creditingPeriodEnd) ?? ``)])}</Tr>
            <Tr>{renderRow(`ANNUAL EST. UNITS`, [...projects.map((p) => `${p.annualEst?.toLocaleString() ?? 0}`)])}</Tr>
            <Tr>{renderRow(`TOTAL ISSUED UNITS`, [...projects.map((p) => `${p.annualIssued?.toLocaleString() ?? 0}`)])}</Tr>
            <Tr>{renderRow(`TOTAL RETIRED UNITS`, [...projects.map((p) => `${p.annualRetired?.toLocaleString() ?? 0}`)])}</Tr>
            <Tr>{renderRow(`TOTAL AVAILABLE UNITS`, [...projects.map((p) => `${p.annualAvailable?.toLocaleString() ?? 0}`)])}</Tr>
          </Table>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
