import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'

export interface CompareCloseButtonProps {
  onClick: () => void
}

const CompareCloseButton: FC<CompareCloseButtonProps> = (props) => {
  const { onClick } = props

  return (
    <Button
      variant="blueOutline"
      width="100%"
      padding="6px 12px"
      maxWidth="200px"
      height="32px"
      border="1px solid #FFFFFF"
      onClick={onClick}
      fontWeight="500"
      data-testid="compare-close-button"
    >
      <Flex alignItems={`center`} textColor={`white`}>
        Close
      </Flex>
    </Button>
  )
}

export default CompareCloseButton
