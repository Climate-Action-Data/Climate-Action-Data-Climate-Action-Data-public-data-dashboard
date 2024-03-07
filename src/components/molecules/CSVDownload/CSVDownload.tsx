import { CSVExportFilenames, CSVExportTypes } from '@/@types/CSV'
import { ProjectSearchFilterValues, UnitSearchFilterValues } from '@/@types/ProjectSearchFilterValues'
import { ToastVariants } from '@/@types/Toast'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { useToastHook } from '@/components/atoms/Toast/Toast'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Button, Flex, Hide, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createAndDownloadCsv } from '../../../utils/CsvHelper'

interface CSVDownloadProps {
  watchlistId?: string
  exportType: CSVExportTypes
  totalResults?: number
}

const DEFAULT_MAX_DOWNLOAD_SIZE = 1000

export const CSVDownload = (props: CSVDownloadProps) => {
  const { exportType, totalResults } = props
  const [preparing, setPreparing] = useState<boolean>(false)
  const [validatedLargeDownload, setValidatedLargeDownload] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation(`search`)
  const { setDownloadStatus } = useActions().exports
  const { keywordSearch, selectedProjectSearchFilterValues, selectedUnitSearchFilterValues } = useAppState().searchFilters
  const { hasDownloaded } = useAppState().exports
  const { exportToCSV } = useEffects().exports
  const [newToast] = useToastHook()

  const handleOnClick = async () => {
    console.log(props)
    if (totalResults && totalResults > DEFAULT_MAX_DOWNLOAD_SIZE && !validatedLargeDownload) {
      onOpen()
    } else {
      downloadData()
    }
  }

  const downloadData = () => {
    setPreparing(true)
    setDownloadStatus(false)
    const downloadStatus = false
    let searchFilters: ProjectSearchFilterValues | UnitSearchFilterValues = selectedProjectSearchFilterValues.searchFilterValues
    if (exportType === CSVExportTypes.UNIT) {
      searchFilters = selectedUnitSearchFilterValues.searchFilterValues
    }
    exportToCSV(exportType, keywordSearch, searchFilters, props.watchlistId).then((exportData) => {
      if (exportData.data) {
        // Create a blob from the response data
        createAndDownloadCsv(exportData.data, exportType === CSVExportTypes.UNIT ? CSVExportFilenames.UNIT_SEARCH : CSVExportFilenames.PROJECT_SEARCH)
        newToast({ variant: ToastVariants.SUCCESS, message: t(`exportValid`), icon: <DownloadIcon /> })
      } else {
        newToast({ variant: ToastVariants.FAILURE, message: t(`exportFail`), icon: <DownloadIcon /> })
      }
      setPreparing(false)
    })
    setDownloadStatus(downloadStatus)
  }
  const clickValidateLargeExport = () => {
    setValidatedLargeDownload(true)
    onClose()
    downloadData()
  }

  useEffect(() => {
    if (hasDownloaded) {
      setPreparing(false)
    }
  }, [hasDownloaded, validatedLargeDownload])

  if (preparing) {
    return <Text>{t(`preparing`)}</Text>
  } else {
    return (
      <Button data-testid="export-data" onClick={handleOnClick} variant="hoverOnly" display="flex" gap="4px" fontWeight="500px">
        <Hide below="md">{t(`export`)}</Hide>
        <DownloadIcon />
        <Modal onClose={onClose} size={`md`} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <Flex alignItems="center">
              <ModalHeader flex={1}>{t(`exportCSVTitle`)}</ModalHeader>
              <CloseIcon _hover={{ cursor: `pointer` }} marginRight="1.5rem" onClick={onClose} />
            </Flex>
            <ModalBody>{t(`exportCSVDesc`)}</ModalBody>
            <ModalFooter gap="48px" justifyContent="center">
              <Button data-testid="cancel-modal" variant={`blueOutline`} onClick={onClose}>
                {t(`cancel`)}
              </Button>
              <Button data-testid="accept-modal" variant={`green`} onClick={clickValidateLargeExport}>
                {t(`export`)}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    )
  }
}
