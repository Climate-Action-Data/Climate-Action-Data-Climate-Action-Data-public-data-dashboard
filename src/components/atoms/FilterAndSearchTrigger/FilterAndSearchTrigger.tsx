import { FC, ReactElement } from 'react'
import { Button } from '@chakra-ui/react'

interface IFilterAndSearchTriggerProps {
  icon: ReactElement
  label: string
  handleOnClick: () => void
}

const FilterAndSearchTrigger: FC<IFilterAndSearchTriggerProps> = (props) => {
  const { handleOnClick, icon, label } = props
  return (
    <Button rightIcon={icon} variant={`linkText`} fontWeight={`medium`} padding={0} height={`min-content`} onClick={handleOnClick}>
      {label}
    </Button>
  )
}

export default FilterAndSearchTrigger
