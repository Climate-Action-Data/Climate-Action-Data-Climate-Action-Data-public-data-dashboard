import { Calendar, RenderProps } from 'dayzed'
import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import CalendarNavigation from '@/components/molecules/CalendarNavigation/CalendarNavigation'
import { MONTH_NAMES_SHORT } from '@/@types/Calendar'
import CalendarBodyDates from '@/components/molecules/CalendarBodyDates/CalendarBodyDates'

interface CalendarBodyProps {
  renderProps: RenderProps
  nextMonth: () => void
  previousMonth: () => void
  nextYear: () => void
  previousYear: () => void
}

const CalenderBody: FC<CalendarBodyProps> = (props) => {
  const {
    renderProps: { calendars, getDateProps },
    nextMonth,
    previousMonth,
    nextYear,
    previousYear,
  } = props

  const renderCalendarNavigation = (calendar: Calendar) => {
    return (
      <>
        <CalendarNavigation navigateToPrev={previousMonth} navigateToNext={nextMonth} label={MONTH_NAMES_SHORT[calendar.month]} />
        <CalendarNavigation navigateToPrev={previousYear} navigateToNext={nextYear} label={calendar.year.toString()} />
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

export default CalenderBody
