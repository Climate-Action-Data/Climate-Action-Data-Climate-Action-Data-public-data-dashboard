import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Button, Hide, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CSVDownloadProps {
  isProject: boolean
  pattern?: string
}

export const CSVDownload = (props: CSVDownloadProps) => {
  const { isProject, pattern } = props
  const [preparing, setPreparing] = useState<boolean>(false)
  const { t } = useTranslation(`search`)
  const { setDownloadStatus } = useActions().exports
  const { hasDownloaded } = useAppState().exports
  const { exportUnitSearchResultToCSV, exportProjectSearchResultToCSV } = useEffects().exports

  const handleOnClick = async () => {
    setPreparing(true)
    setDownloadStatus(false)

    if (isProject) {
      const downloadStatus = await exportProjectSearchResultToCSV(pattern ?? ``)
      setDownloadStatus(downloadStatus)
    } else {
      const downloadStatus = await exportUnitSearchResultToCSV(pattern ?? ``)
      setDownloadStatus(downloadStatus)
    }
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
