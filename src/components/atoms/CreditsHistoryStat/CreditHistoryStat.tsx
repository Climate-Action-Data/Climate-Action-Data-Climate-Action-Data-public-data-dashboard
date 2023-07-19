import { FC } from 'react'
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { AeonikFono } from '@/styles/theme/fonts'

interface CreditHistoryStateProps {
  amount: number | undefined
  label: string
  textColor?: string
}

const CreditsHistoryStat: FC<CreditHistoryStateProps> = ({ amount, label, textColor }) => {
  const formattedAmount = new Intl.NumberFormat(`en-SG`, { notation: `compact`, maximumSignificantDigits: 3 }).format(amount ?? 0)
  const regexp = /^(\d+.?\d*)(\w?)$/
  const matches = formattedAmount.match(regexp)
  const suffix = matches?.pop()
  const compactAmount = matches?.pop()
  return (
    <Stat textAlign={`center`} className={AeonikFono.className}>
      <StatNumber>
        <Text variant={`statValue`} color={textColor} fontSize={[`40px`, null, `64px`]}>
          {compactAmount}
        </Text>
        <Text variant={`statSuffix`} fontSize={[`16px`, null, `24px`]}>
          {suffix}
        </Text>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  )
}
export default CreditsHistoryStat
