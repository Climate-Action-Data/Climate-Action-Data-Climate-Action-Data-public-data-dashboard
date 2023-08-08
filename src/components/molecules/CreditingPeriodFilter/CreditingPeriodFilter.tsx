import { Button, Flex, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spacer, VStack } from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CalendarWrapper from '@/components/molecules/CalendarWrapper/CalendarWrapper'
import { MinusIcon } from '@/components/atoms/MinusIcon/MinusIcon'
import DateInput from '@/components/molecules/DateInput/DateInput'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { DateFormats } from '@/@types/DateFormats'
import { DatesFilter } from '@/@types/ProjectSearchFilterValues'

interface CreditingPeriodFilterProp {
  label: string
  earliestDate?: Date
  latestDate?: Date
  dateFilter?: DatesFilter
  onDateChange: (payload: DatesFilter) => void
}

const CreditingPeriodFilter: FC<CreditingPeriodFilterProp> = (prop) => {
  const { label, earliestDate, latestDate, onDateChange, dateFilter } = prop

  const [minimumDate, setMinimumDate] = useState<Date | undefined>()
  const [maximumDate, setMaximumDate] = useState<Date | undefined>()
  const [showMinimumDateSelector, setShowMinimumDateSelector] = useState<boolean>(false)
  const [showMaximumDateSelector, setShowMaximumDateSelector] = useState<boolean>(false)

  const { t } = useTranslation(`search`)

  useEffect(() => {
    setMinimumDate(dateFilter?.minDate)
    setMaximumDate(dateFilter?.maxDate)
  }, [dateFilter])

  const getOnApplySelectedDate = (action: Dispatch<SetStateAction<Date | undefined>>, selectedDate: Date | undefined) => {
    action(selectedDate)
    setShowMinimumDateSelector(false)
    setShowMaximumDateSelector(false)
  }

  const renderDateSelector = (stateValue: Date | undefined, action: Dispatch<SetStateAction<Date | undefined>>) => {
    return (
      <CalendarWrapper
        preSelectedDate={stateValue}
        maxDate={latestDate ?? maximumDate}
        minDate={earliestDate ?? minimumDate}
        onApplySelectedDate={(selectedDate) => getOnApplySelectedDate(action, selectedDate)}
      />
    )
  }

  const handleOnOpenDatePickerMinimumDate = () => {
    setShowMinimumDateSelector(true)
  }

  const handleOnOpenDatePickerMaximumDate = () => {
    setShowMaximumDateSelector(true)
  }

  const handleOnClearClick = () => {
    setMinimumDate(undefined)
    setMaximumDate(undefined)
    onDateChange({})
  }

  const handleOnApplyClick = () => {
    if (minimumDate && maximumDate) {
      if (minimumDate <= maximumDate) {
        onDateChange({ maxDate: maximumDate, minDate: minimumDate })
      }
    }
    if (minimumDate) {
      onDateChange({ minDate: minimumDate })
    }
    if (maximumDate) {
      onDateChange({ maxDate: maximumDate })
    }
  }

  const handleOnClose = () => {
    setShowMinimumDateSelector(false)
    setShowMaximumDateSelector(false)
  }

  const handleMinDateOnChange = (date: Date | undefined) => {
    setMinimumDate(date)
  }

  const handleMaxDateOnChange = (date: Date | undefined) => {
    setMaximumDate(date)
  }

  const renderContent = () => {
    if (showMaximumDateSelector || showMinimumDateSelector) {
      return null
    }
    return (
      <VStack>
        <HStack width={`100%`} justify={`center`} alignItems={`end`}>
          <DateInput
            label={`Minimum Date`}
            value={minimumDate}
            onOpenDatePicker={handleOnOpenDatePickerMinimumDate}
            maxDate={latestDate ?? maximumDate}
            minDate={earliestDate}
            onChange={handleMinDateOnChange}
          />
          <MinusIcon />
          <DateInput
            label={`Maximum Date`}
            value={maximumDate}
            onOpenDatePicker={handleOnOpenDatePickerMaximumDate}
            maxDate={latestDate}
            minDate={earliestDate ?? minimumDate}
            onChange={handleMaxDateOnChange}
          />
        </HStack>
        <HStack justify={`space-between`} width={`100%`} margin={`8px`}>
          <Button variant={`textLink`} onClick={handleOnClearClick} data-testid={`crediting-period-filter-clear`}>
            {t(`clear`)}
          </Button>
          <Button variant={`textLink`} onClick={handleOnApplyClick} data-testid={`crediting-period-filter-apply`}>
            {t(`apply`)}
          </Button>
        </HStack>
      </VStack>
    )
  }

  const renderLabel = () => {
    if (minimumDate && maximumDate) {
      return `${format(minimumDate, DateFormats.YYYY_MM_DD)} - ${format(maximumDate, DateFormats.YYYY_MM_DD)}`
    }
    if (minimumDate) {
      return `${format(minimumDate, DateFormats.YYYY_MM_DD)} and later`
    }
    if (maximumDate) {
      return t(`upTo`, { date: format(maximumDate, DateFormats.YYYY_MM_DD) })
    }
    return label
  }

  return (
    <Popover gutter={0} isLazy placement={`bottom`} matchWidth onClose={handleOnClose}>
      <PopoverTrigger>
        <Button variant={`dropdownUnselected`}>
          <Flex fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {renderLabel()}
            <Spacer />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={401} border={0} borderRadius={`8px`} width={[`100%`, null, null, `min-content`]} height={`min-content`} backgroundColor={`white`} boxShadow={`xl`}>
        <PopoverBody width={`100%`}>
          {renderContent()}
          {showMinimumDateSelector && renderDateSelector(minimumDate, setMinimumDate)}
          {showMaximumDateSelector && renderDateSelector(maximumDate, setMaximumDate)}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default CreditingPeriodFilter
