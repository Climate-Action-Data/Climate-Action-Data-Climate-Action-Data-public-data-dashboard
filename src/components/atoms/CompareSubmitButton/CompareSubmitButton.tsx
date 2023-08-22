import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { CompareIcon } from '../CompareIcon/CompareIcon'
import { useTranslation } from 'react-i18next'

export interface CompareSubmitButtonProps {
  isDisabled?: boolean
  onClick: () => void
}

const CompareSubmitButton: FC<CompareSubmitButtonProps> = (props) => {
  const { isDisabled, onClick } = props
  const { t } = useTranslation(`search`)

  return (
    <Button
      variant="accentPrimary32"
      width="100%"
      minW={`187px`}
      height="32px"
      maxWidth="200px"
      onClick={onClick}
      isDisabled={isDisabled}
      fontSize="14px"
      data-testid="compare-submit-button"
    >
      <Flex alignItems={`center`} textColor={`black`}>
        {t(`projectCompare.compare`)}
      </Flex>
      <CompareIcon width="16px" height="16px" color={`black`} ml="4px" />
    </Button>
  )
}

export default CompareSubmitButton
