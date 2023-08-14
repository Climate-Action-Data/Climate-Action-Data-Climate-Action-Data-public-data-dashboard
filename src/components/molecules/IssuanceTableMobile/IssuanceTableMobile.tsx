import { Issuance, IssuanceUnit } from '@/@types/ProjectDetails'
import { IssuanceTableMobileItem } from '@/components/atoms/IssuanceTableMobileItem/IssuanceTableMobileItem'
import { NoDataScreen } from '@/components/atoms/NoDataScreen/NoDataScreen'
import { RetirementMobileTable } from '@/components/atoms/RetirementMobileTable/RetirementMobileTable'
import { Accordion, Box, Button, Flex, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IssuanceTableMobileProps {
  issuances: Issuance[]
}

export const IssuanceTableMobile = (props: IssuanceTableMobileProps) => {
  const { issuances } = props
  const [retirements, setRetirements] = useState<IssuanceUnit[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation(`projectDetails`)

  const handleIssuanceClick = (retirements: IssuanceUnit[]) => {
    setRetirements(retirements)
    onOpen()
  }

  const renderAccordionItems = () => {
    return issuances.map((issuance) => (
      <IssuanceTableMobileItem onClick={(retirements) => handleIssuanceClick(retirements)} issuance={issuance} key={`issuance-table-mobile-item-${issuance.id}`} />
    ))
  }

  const renderHeadingWithUnderling = (text: string) => {
    return (
      <Box minH="56px" borderBottom="2px solid" borderBottomColor="lightGray.700">
        <Flex padding="0 24px" alignItems="center" height="56px">
          <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
            {text}
          </Heading>
        </Flex>
      </Box>
    )
  }

  return (
    <Box w="100%">
      {renderHeadingWithUnderling(t(`issuances.title`))}
      <Accordion gap="16px" padding="0px 0px 16px 0px" allowToggle>
        {renderAccordionItems()}
      </Accordion>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginX="12px" minH="503px" maxH="503px">
          <ModalHeader p={0}>{renderHeadingWithUnderling(t(`issuances.retirememts`))}</ModalHeader>
          <ModalBody overflowY="scroll" p="12px" paddingBottom="20px">
            <Flex width="100%" gap="16px" flexDirection="column" padding="0px">
              {retirements.length > 0 ? <RetirementMobileTable retirements={retirements} /> : <NoDataScreen message={t(`issuances.noRetirementData`)} />}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="modalClose" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
