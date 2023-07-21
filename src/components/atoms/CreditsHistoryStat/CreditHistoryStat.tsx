import { FC } from 'react'
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'

import { AeonikFono } from '@/styles/fonts'
import { toCompactValueAndSuffix } from '@/utils/UnitConverter'

interface CreditHistoryStateProps {
  amount: number | undefined
  label: string
  textColor?: string
}

const CreditsHistoryStat: FC<CreditHistoryStateProps> = ({ amount, label, textColor }) => {
  const [compactAmount, suffix] = toCompactValueAndSuffix(amount ?? 0)

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
