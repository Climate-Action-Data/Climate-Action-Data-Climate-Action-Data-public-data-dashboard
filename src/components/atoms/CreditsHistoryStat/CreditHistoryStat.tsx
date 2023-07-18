import { FC } from 'react'
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'

interface CreditHistoryStateProps {
  amount: number
  label: string
  textColor?: string
}

const CreditsHistoryStat: FC<CreditHistoryStateProps> = ({ amount, label, textColor }) => {
  const formattedAmount = new Intl.NumberFormat(`en-SG`, { notation: `compact`, minimumSignificantDigits: 3 }).format(amount)
  const regexp = /^(\d.?\d{0,2})(\w?)$/
  const matches = formattedAmount.match(regexp)
  const suffix = matches?.pop()
  const compactAmount = matches?.pop()
  return (
    <Stat textAlign={`center`}>
      <StatNumber>
        <Text variant={`statValue`} color={textColor}>
          {compactAmount}
        </Text>
        <Text variant={`statSuffix`}>{suffix}</Text>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  )
}
export default CreditsHistoryStat
