import { Button, Flex, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spacer, VStack } from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CalendarWrapper from '@/components/molecules/CalendarWrapper/CalendarWrapper'
import { MinusIcon } from '@/components/atoms/MinusIcon/MinusIcon'
import DateInput from '@/components/molecules/DateInput/DateInput'
import { useActions, useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

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

  const renderDateSelector = (stateValue: Date | undefined, action: Dispatch<SetStateAction<Date | undefined>>) => {
    return (
      <CalendarWrapper
        preSelectedDate={stateValue}
        maxDate={latestDate}
        minDate={earliestDate}
        applySelectedDate={(selectedDate) => {
          action(selectedDate)
          setShowMinimumDateSelector(false)
          setShowMaximumDateSelector(false)
        }}
      />
    )
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
            openDatePicker={() => setShowMinimumDateSelector(true)}
            maxDate={latestDate}
            minDate={earliestDate}
            onChange={setMinimumDate}
          />
          <MinusIcon />
          <DateInput
            label={`Maximum Date`}
            value={maximumDate}
            openDatePicker={() => setShowMaximumDateSelector(true)}
            maxDate={latestDate}
            minDate={earliestDate}
            onChange={setMaximumDate}
          />
        </HStack>
        <HStack justify={`space-between`} width={`100%`} margin={`8px`}>
          <Button
            variant={`textLink`}
            onClick={() => {
              setMinimumDate(undefined)
              setMaximumDate(undefined)
              setCreditingPeriodFilter({})
            }}
            data-testid={`crediting-period-filter-clear`}
          >
            {t(`clear`)}
          </Button>
          <Button variant={`textLink`} onClick={() => setCreditingPeriodFilter({ maxDate: maximumDate, minDate: minimumDate })} data-testid={`crediting-period-filter-apply`}>
            {t(`apply`)}
          </Button>
        </HStack>
      </VStack>
    )
  }

  const renderLabel = () => {
    if (minimumDate && maximumDate) {
      return `${format(minimumDate, `dd/MM/yyyy`)} - ${format(maximumDate, `dd/MM/yyyy`)}`
    }
    if (minimumDate) {
      return `${format(minimumDate, `dd/MM/yyyy`)} and later`
    }
    if (maximumDate) {
      return t(`upTo`, { date: format(maximumDate, `dd/MM/yyyy`) })
      // return `Up to ${format(maximumDate, `dd/MM/yyyy`)}`
    }
    return label
  }

  const handleOnClose = () => {
    setShowMinimumDateSelector(false)
    setShowMaximumDateSelector(false)
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
