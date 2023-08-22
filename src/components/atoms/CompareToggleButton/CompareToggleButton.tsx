import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { CompareIcon } from '../CompareIcon/CompareIcon'

export interface CompareToggleButtonProps {
  isDisabled?: boolean
  onClick: () => void
}

const CompareToggleButton: FC<CompareToggleButtonProps> = (props) => {
  const { isDisabled, onClick } = props

  return (
    <Button
      padding="6px 8px 6px 12px"
      height="32px"
      width="max-content"
      border="1px solid #FFFFFF"
      onClick={onClick}
      isDisabled={isDisabled}
      borderRadius="32px"
      fontSize="14px"
      fontWeight="medium"
      data-testid="compare-toggle-button"
    >
      <Flex alignItems={`center`} textColor={`white`}>
        Compare
      </Flex>
      <CompareIcon width="16px" height="16px" color={`white`} ml="4px" />
    </Button>
  )
}

export default CompareToggleButton
