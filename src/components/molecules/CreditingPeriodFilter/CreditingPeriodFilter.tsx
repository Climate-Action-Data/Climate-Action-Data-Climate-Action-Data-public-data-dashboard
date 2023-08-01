import { Button, Flex, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spacer, VStack } from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import DatePicker from '@/components/molecules/DatePicker/DatePicker'
import { MinusIcon } from '@/components/atoms/MinusIcon/MinusIcon'
import { FC, useState } from 'react'
import { FilterDates } from '@/@types/SearchFilterValues'
import { useTranslation } from 'react-i18next'

interface CreditPeriodFilterProps {
  label: string
  applyFilter: (filterDates: FilterDates) => void
  selectedFilterDates?: FilterDates
}

const CreditingPeriodFilter: FC<CreditPeriodFilterProps> = (props) => {
  const { label, selectedFilterDates, applyFilter } = props
  const [minDate, setMinDate] = useState<Date | undefined>(selectedFilterDates?.minDate)
  const [maxDate, setMaxDate] = useState<Date | undefined>(selectedFilterDates?.maxDate)
  const { t } = useTranslation(`search`)

  const handleApply = () => {
    applyFilter({ minDate, maxDate })
  }

  const handleClear = () => {
    setMaxDate(undefined)
    setMinDate(undefined)
    applyFilter({ minDate: undefined, maxDate: undefined })
  }

  const handleSetMaxDate = (date?: Date) => {
    setMaxDate(date)
  }

  const handleSetMinDate = (date?: Date) => {
    setMinDate(date)
  }

  const handleOnClose = () => {
    setMaxDate(selectedFilterDates?.maxDate)
    setMinDate(selectedFilterDates?.minDate)
  }

  return (
    <Popover gutter={0} isLazy placement={`bottom-end`} matchWidth onClose={handleOnClose}>
      <PopoverTrigger>
        <Button variant={`dropdownUnselected`}>
          <Flex fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {label}
            <Spacer />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent border={0} borderRadius={`4px`} width={[`100%`, null, null, `374px`]} backgroundColor={`white`} boxShadow={`xl`} padding={`16px`}>
        <PopoverBody maxHeight={`200px`} width={`100%`} padding={0}>
          <VStack gap={`16px`}>
            <HStack alignItems={`end`}>
              <DatePicker label={`Minimum Date`} date={minDate} onChange={handleSetMinDate} maxDate={maxDate} />
              <MinusIcon />
              <DatePicker label={`Maximum Date`} date={maxDate} onChange={handleSetMaxDate} minDate={minDate} />
            </HStack>
            <Flex justifyContent={`space-between`} width={`100%`}>
              <Button variant={`textLink`} onClick={handleClear}>
                {t(`clear`)}
              </Button>
              <Button variant={`textLink`} onClick={handleApply}>
                {t(`apply`)}
              </Button>
            </Flex>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default CreditingPeriodFilter
