import { FC } from 'react'
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'

import { toCompactValueAndSuffix } from '@/utils/UnitConverter'

interface CreditHistoryStateProps {
  amount: number | undefined
  label: string
  textColor?: string
}

const CreditsHistoryStat: FC<CreditHistoryStateProps> = (props: CreditHistoryStateProps) => {
  const { amount, label, textColor } = props
  const [compactAmount, suffix] = toCompactValueAndSuffix(amount ?? 0)

  return (
    <Stat variant="statMain" textAlign={`center`}>
      <StatNumber color={textColor}>
        <Text>{compactAmount}</Text>
        <Text>{suffix}</Text>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  )
}
export default CreditsHistoryStat
