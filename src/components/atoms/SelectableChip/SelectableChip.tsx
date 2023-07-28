import { FC } from 'react'
import { Tag, TagLabel } from '@chakra-ui/react'

interface SelectableChipProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

const SelectableChip: FC<SelectableChipProps> = ({ label, isSelected = false, onClick = () => null }) => {
  return (
    <Tag variant={isSelected ? `selected` : `notSelected`} data-testid={`test-id-${label}`} onClick={onClick}>
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}

export default SelectableChip
