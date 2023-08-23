import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { useTranslation } from 'react-i18next'

export interface ExportComparisonButtonProps {
  onClick: () => void
}

const ExportComparisonButton: FC<ExportComparisonButtonProps> = (props) => {
  const { onClick } = props
  const { t } = useTranslation(`search`)

  return (
    <Button
      padding="6px 8px 6px 12px"
      height="32px"
      width="max-content"
      border="1px solid #00242C"
      onClick={onClick}
      bg={`white`}
      borderRadius="32px"
      fontSize="14px"
      fontWeight="medium"
      data-testid="export-comparison-button"
    >
      <Flex alignItems={`center`}>{t(`projectCompare.exportComparison`)}</Flex>
      <DownloadIcon ml="4px" />
    </Button>
  )
}

export default ExportComparisonButton
