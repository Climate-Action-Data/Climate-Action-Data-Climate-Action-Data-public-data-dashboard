import { Button, Flex, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spacer, VStack } from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CalendarWrapper from '@/components/molecules/CalendarWrapper/CalendarWrapper'
import { MinusIcon } from '@/components/atoms/MinusIcon/MinusIcon'
import DateInput from '@/components/molecules/DateInput/DateInput'
import { useActions, useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { DateFormats } from '@/@types/DateFormats'

interface CreditingPeriodFilterProp {
  label: string
  earliestDate?: Date
  latestDate?: Date
}

const CreditingPeriodFilter: FC<CreditingPeriodFilterProp> = (prop) => {
  const { label, earliestDate, latestDate } = prop
  const { setCreditingPeriodFilter } = useActions().searchFilters
  const { selectedSearchFilterValues } = useAppState().searchFilters

  const [minimumDate, setMinimumDate] = useState<Date | undefined>()
  const [maximumDate, setMaximumDate] = useState<Date | undefined>()
  const [showMinimumDateSelector, setShowMinimumDateSelector] = useState<boolean>(false)
  const [showMaximumDateSelector, setShowMaximumDateSelector] = useState<boolean>(false)

  const { t } = useTranslation(`search`)

  useEffect(() => {
    setMinimumDate(selectedSearchFilterValues.searchFilterValues.creditingPeriod?.minDate)
    setMaximumDate(selectedSearchFilterValues.searchFilterValues.creditingPeriod?.maxDate)
  }, [selectedSearchFilterValues.searchFilterValues.creditingPeriod])

  const getOnApplySelectedDate = (action: Dispatch<SetStateAction<Date | undefined>>, selectedDate: Date | undefined) => {
    action(selectedDate)
    setShowMinimumDateSelector(false)
    setShowMaximumDateSelector(false)
  }

  const renderDateSelector = (stateValue: Date | undefined, action: Dispatch<SetStateAction<Date | undefined>>) => {
    return (
      <CalendarWrapper
        preSelectedDate={stateValue}
        maxDate={latestDate}
        minDate={earliestDate}
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
    setCreditingPeriodFilter({})
  }

  const handleOnApplyClick = () => {
    setCreditingPeriodFilter({ maxDate: maximumDate, minDate: minimumDate })
  }

  const handleOnClose = () => {
    setShowMinimumDateSelector(false)
    setShowMaximumDateSelector(false)
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
            maxDate={latestDate}
            minDate={earliestDate}
            onChange={setMinimumDate}
          />
          <MinusIcon />
          <DateInput
            label={`Maximum Date`}
            value={maximumDate}
            onOpenDatePicker={handleOnOpenDatePickerMaximumDate}
            maxDate={latestDate}
            minDate={earliestDate}
            onChange={setMaximumDate}
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
