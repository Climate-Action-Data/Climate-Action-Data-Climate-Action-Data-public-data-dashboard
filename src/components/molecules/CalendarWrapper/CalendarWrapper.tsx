import { FC, useEffect, useState } from 'react'
import Dayzed from 'dayzed'
import { Box, Button, VStack } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import CalenderBody from '@/components/molecules/CalendarBody/CalendarBody'
import { differenceInCalendarMonths } from 'date-fns'

const MONTHS_IN_YEAR = 12

interface CalendarWrapperProps {
  maxDate?: Date
  minDate?: Date
  preSelectedDate?: Date
  applySelectedDate: (date: Date | undefined) => void
}

const CalendarWrapper: FC<CalendarWrapperProps> = (props) => {
  const { applySelectedDate, preSelectedDate, maxDate, minDate } = props

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

  const handleNextMonth = () => setOffset((prevState) => prevState + 1)
  const handlePreviousMonth = () => setOffset((prevState) => prevState - 1)
  const handleNextYear = () => setOffset((prevState) => prevState + MONTHS_IN_YEAR)
  const handlePreviousYear = () => setOffset((prevState) => prevState - MONTHS_IN_YEAR)

  const handleOnClearClick = () => {
    applySelectedDate(undefined)
  }

  const handleOnOKClick = () => {
    applySelectedDate(selectedDate)
  }

  return (
    <VStack>
      <Dayzed
        onDateSelected={(selectedDate, event) => setSelectedDate(selectedDate.date)}
        showOutsideDays
        offset={offset}
        maxDate={maxDate}
        minDate={minDate}
        selected={selectedDate}
        render={(renderProps) => (
          <CalenderBody renderProps={renderProps} nextMonth={handleNextMonth} previousMonth={handlePreviousMonth} nextYear={handleNextYear} previousYear={handlePreviousYear} />
        )}
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
