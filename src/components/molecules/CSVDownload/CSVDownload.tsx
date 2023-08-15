import { CSVExportTypes } from '@/@types/CSV'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Button, Hide, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CSVDownloadProps {
  exportType: CSVExportTypes
  pattern?: string
}

export const CSVDownload = (props: CSVDownloadProps) => {
  const { exportType, pattern } = props
  const [preparing, setPreparing] = useState<boolean>(false)
  const { t } = useTranslation(`search`)
  const { setDownloadStatus } = useActions().exports
  const { hasDownloaded } = useAppState().exports
  const { exportUnitSearchResultToCSV, exportProjectSearchResultToCSV } = useEffects().exports

  const handleOnClick = async () => {
    setPreparing(true)
    setDownloadStatus(false)
    let downloadStatus = false
    switch (exportType) {
      case CSVExportTypes.PROJECT:
        downloadStatus = await exportProjectSearchResultToCSV(pattern ?? ``)
        break

      case CSVExportTypes.UNIT:
        downloadStatus = await exportUnitSearchResultToCSV(pattern ?? ``)
        break
    }
    setDownloadStatus(downloadStatus)
  }

  useEffect(() => {
    if (hasDownloaded) {
      setPreparing(false)
    }
  }, [hasDownloaded])

  if (preparing) {
    return <Text>{t(`preparing`)}</Text>
  } else {
    return (
      <Button data-testid="export-data" onClick={handleOnClick} variant="hoverOnly" display="flex" gap="4px" fontWeight="500px">
        <Hide below="md">{t(`export`)}</Hide>
        <DownloadIcon />
      </Button>
    )
  }
}
