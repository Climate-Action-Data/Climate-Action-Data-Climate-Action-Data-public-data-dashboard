import { Calendar, RenderProps } from 'dayzed'
import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import CalendarNavigation from '@/components/molecules/CalendarNavigation/CalendarNavigation'
import { getMonthNames } from '@/@types/Calendar'
import CalendarBodyDates from '@/components/molecules/CalendarBodyDates/CalendarBodyDates'

interface CalendarBodyProps {
  renderProps: RenderProps
  onNextMonth: () => void
  onPreviousMonth: () => void
  onNextYear: () => void
  onPreviousYear: () => void
}

const CalendarBody: FC<CalendarBodyProps> = (props) => {
  const {
    renderProps: { calendars, getDateProps },
    onNextMonth,
    onPreviousMonth,
    onNextYear,
    onPreviousYear,
  } = props

  const monthNames = getMonthNames()

  const renderCalendarNavigation = (calendar: Calendar) => {
    return (
      <>
        <CalendarNavigation navigateToPrev={onPreviousMonth} navigateToNext={onNextMonth} label={monthNames[calendar.month]} />
        <CalendarNavigation navigateToPrev={onPreviousYear} navigateToNext={onNextYear} label={calendar.year.toString()} />
      </>
    )
  }

  return (
    calendars.length && (
      <Box>
        {calendars.map((calendar) => {
          return (
            <Box width={`336px`} height={`min-content`} key={calendar.year}>
              <Flex justifyContent={`space-around`}>{renderCalendarNavigation(calendar)}</Flex>
              <CalendarBodyDates calendar={calendar} getDateProps={getDateProps} />
            </Box>
          )
        })}
      </Box>
    )
  )
}

export default CalendarBody
