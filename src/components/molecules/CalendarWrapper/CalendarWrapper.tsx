import { FC, useEffect, useState } from 'react'
import Dayzed, { RenderProps } from 'dayzed'
import { Box, Button, VStack } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import CalendarBody from '@/components/molecules/CalendarBody/CalendarBody'
import { differenceInCalendarMonths } from 'date-fns'
import { MONTHS_IN_YEAR } from '@/@types/Calendar'

interface CalendarWrapperProps {
  maxDate?: Date
  minDate?: Date
  preSelectedDate?: Date
  onApplySelectedDate: (date: Date | undefined) => void
}

const CalendarWrapper: FC<CalendarWrapperProps> = (props) => {
  const { onApplySelectedDate, preSelectedDate, maxDate, minDate } = props

  const [offset, setOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const { t } = useTranslation(`search`)

  useEffect(() => {
    if (preSelectedDate) {
      setSelectedDate(preSelectedDate)
      setOffset(differenceInCalendarMonths(preSelectedDate, new Date()))
    }
  }, [preSelectedDate])

  useEffect(() => {
    if (preSelectedDate) {
      setSelectedDate(preSelectedDate)
    }
  }, [preSelectedDate])

  const handleOnNextMonth = () => setOffset((prevState) => prevState + 1)
  const handleOnPreviousMonth = () => setOffset((prevState) => prevState - 1)
  const handleOnNextYear = () => setOffset((prevState) => prevState + MONTHS_IN_YEAR)
  const handleOnPreviousYear = () => setOffset((prevState) => prevState - MONTHS_IN_YEAR)

  const handleOnClearClick = () => {
    onApplySelectedDate(undefined)
  }

  const handleOnOKClick = () => {
    onApplySelectedDate(selectedDate)
  }

  const handleOnDateSelected = (selectedDate: Date) => {
    setSelectedDate(selectedDate)
  }

  const onRender = (renderProps: RenderProps) => {
    return (
      <CalendarBody
        renderProps={renderProps}
        onNextMonth={handleOnNextMonth}
        onPreviousMonth={handleOnPreviousMonth}
        onNextYear={handleOnNextYear}
        onPreviousYear={handleOnPreviousYear}
      />
    )
  }

  return (
    <VStack>
      <Dayzed
        onDateSelected={(selectedDate) => handleOnDateSelected(selectedDate.date)}
        showOutsideDays
        offset={offset}
        maxDate={maxDate}
        minDate={minDate}
        selected={selectedDate}
        render={onRender}
      />
      <Box alignSelf={`end`}>
        <Button variant={`calendarAction`} data-testid={`calender-wrapper-clear`} onClick={handleOnClearClick}>
          {t(`clear`)}
        </Button>
        <Button variant={`calendarAction`} data-testid={`calender-wrapper-ok`} onClick={handleOnOKClick}>
          {t(`ok`)}
        </Button>
      </Box>
    </VStack>
  )
}
export default CalendarWrapper
