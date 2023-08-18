import { CSVExportTypes } from '@/@types/CSV'
import { ProjectSearchFilterValues, UnitSearchFilterValues } from '@/@types/ProjectSearchFilterValues'
import { ToastVariants } from '@/@types/Toast'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { useToastHook } from '@/components/atoms/Toast/Toast'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Button, Flex, Hide, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CSVDownloadProps {
  exportType: CSVExportTypes
  totalResults?: number
}

const DEFAULT_BLOB_TYPE = `application/octet-stream`
const DEFAULT_LINK_ELEMENT = `a`
const DEFAULT_DL_ATTRIBUTE = `download`
const DEFAULT_FILE_NAME = `export.csv`
const DEFAULT_LINK_DISPLAY = `none`
const DEFAULT_MAX_DOWNLOAD_SIZE = 1000

export const createAndDownload = (data: Blob) => {
  const blob = new Blob([data], { type: DEFAULT_BLOB_TYPE })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement(DEFAULT_LINK_ELEMENT)
  link.style.display = DEFAULT_LINK_DISPLAY
  link.setAttribute(`data-testid`, `invisible-link`)
  link.href = url
  link.setAttribute(DEFAULT_DL_ATTRIBUTE, DEFAULT_FILE_NAME)
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(url)
}

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
    if (totalResults && totalResults > DEFAULT_MAX_DOWNLOAD_SIZE && !validatedLargeDownload) {
      onOpen()
      return
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
    exportToCSV(exportType, keywordSearch, searchFilters).then((exportData) => {
      if (exportData.data) {
        // Create a blob from the response data
        createAndDownload(exportData.data)
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
              <Button variant={`blueOutline`} onClick={onClose}>
                {t(`cancel`)}
              </Button>
              <Button variant={`green`} onClick={clickValidateLargeExport}>
                {t(`export`)}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    )
  }
}
