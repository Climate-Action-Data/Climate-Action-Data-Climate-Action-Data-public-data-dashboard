import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'

export interface ExportComparisonButtonProps {
  onClick: () => void
}

const ExportComparisonButton: FC<ExportComparisonButtonProps> = (props) => {
  const { onClick } = props

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
      data-testid="compare-toggle-button"
    >
      <Flex alignItems={`center`}>Export comparison table</Flex>
      <DownloadIcon ml="4px" />
    </Button>
  )
}

export default ExportComparisonButton
