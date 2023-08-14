import { Issuance, IssuanceUnit } from '@/@types/ProjectDetails'
import { AccordionItem, AccordionButton, Flex, SimpleGrid, AccordionPanel, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '../ChevronDownIcon/ChevronDownIcon'
import { ChevronUpIcon } from '../ChevronUpIcon/ChevronUpIcon'
import { DetailWidget } from '../DetailWidget/DetailWidget'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { Link } from '@chakra-ui/next-js'
import { UnitStatus } from '@/@types/Unit'

interface IssuanceTableMobileItemProps {
  issuance: Issuance
  onClick?: (retirements: IssuanceUnit[]) => void
}

export const IssuanceTableMobileItem = (props: IssuanceTableMobileItemProps) => {
  const { issuance, onClick } = props
  const { t } = useTranslation(`projectDetails`)

  const handleClick = () => {
    if (onClick) {
      onClick(issuance.units.filter((unit) => unit.status === UnitStatus.RETIRED))
    }
  }

  return (
    <AccordionItem borderRadius="8px" margin="12px" padding="8px 16px 8px 8px" border="none" outline="none" boxShadow="2px 2px 8px 0px #0000001A">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton data-testid="expand-accordion" h="84px">
              <Flex w="100%" alignItems="center">
                <SimpleGrid justifyItems="start" textAlign="left" flex={1} width="auto" columns={2} gap="24px">
                  <DetailWidget title={t(`issuanceDetails.vintage`)}>{issuance.vintage}</DetailWidget>
                  <DetailWidget title={t(`issuanceDetails.quantity`)}>{issuance.quantity.toLocaleString()}</DetailWidget>
                </SimpleGrid>
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Flex>
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <SimpleGrid p={4} justifyItems="start" textAlign="left" flex={1} width="auto" columns={2} gap="24px">
              <DetailWidget title={t(`issuances.unitsAvailable`)}>{issuance.availableUnits.toLocaleString()}</DetailWidget>
              <DetailWidget title={t(`verificationHeaders.validationUpdated`)}>{formatDate(issuance.date, DateFormats.YYYY_MM_DD)}</DetailWidget>
            </SimpleGrid>
            <Flex alignItems="center" flexWrap="wrap" justifyContent="flex-end" gap="16px">
              <Link data-testid="expand-more-details" href={`/issuance?id=${issuance.id}`} as="button" variant="blueOutline">
                {t(`moreDetails`)}
              </Link>
              <Button data-testid="issuance-mobile-item-click" onClick={handleClick} variant="blueFilled">
                {t(`viewRetirements`)}
              </Button>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
