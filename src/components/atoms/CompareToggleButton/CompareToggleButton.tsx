import { Button } from '@chakra-ui/react'
import { FC } from 'react'

export interface CompareToggleButtonProps {
  isEnabled?: boolean
  onClick: () => void
}

const CompareToggleButton: FC<CompareToggleButtonProps> = (props) => {
  const { onClick } = props
  return (
    <Button padding="6px 8px 6px 12p" width="max-content" onClick={onClick} borderRadius="32px" fontSize="14px" fontWeight="medium" data-testid="compare-toggle-button">
      Compare
    </Button>
  )
}

export default CompareToggleButton
