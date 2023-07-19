import { FC } from 'react'
import { Aeonik } from '@/styles/theme/fonts'
import { Tag, TagLabel } from '@chakra-ui/react'
import styles from './SelectableChip.module.scss'

interface SelectableChipProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

const SelectableChip: FC<SelectableChipProps> = ({ label, isSelected = false, onClick = () => null }) => {
  return (
    <Tag className={`${Aeonik.className} ${isSelected ? styles.selected : styles.notSelected}`} onClick={onClick}>
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}

export default SelectableChip
