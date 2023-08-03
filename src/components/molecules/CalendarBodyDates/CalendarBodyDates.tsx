import { Calendar, GetDatePropsOptions } from 'dayzed'
import { Box, Button, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { getWeekdayNames } from '@/@types/Calendar'

interface CalendarBodyDatesProps {
  calendar: Calendar
  getDateProps: (data: GetDatePropsOptions) => Record<string, any>
}

const CalendarBodyDates: FC<CalendarBodyDatesProps> = (props) => {
  const { calendar, getDateProps } = props

  const weekDayNames = getWeekdayNames()

  return (
    <Box>
      <Wrap spacing={0}>
        {weekDayNames.map((weekday) => (
          <WrapItem key={`${calendar.month}${calendar.year}${weekday}`} boxSize={`48px`} justifyContent={`center`}>
            <Text textAlign={`center`} fontFamily={`body`} fontWeight={`medium`} margin={`auto`}>
              {weekday[0]}
            </Text>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap spacing={0}>
        {calendar.weeks.map((week, weekIndex) =>
          week.map((dateObj, index) => {
            const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
            if (!dateObj) {
              return <WrapItem key={key} width={`calc(100% / 7)`}></WrapItem>
            }
            const { date, selected, selectable, today } = dateObj
            let background = today ? `lightGray.200` : `transparent`
            background = selected ? `lightGray.800` : background
            background = !selectable ? `transparent` : background
            return (
              <WrapItem key={key} boxSize={`48px`} justifyContent={`center`}>
                {selectable ? (
                  <Button variant={`calendarDate`} color={selected ? `white` : `black`} backgroundColor={background} {...getDateProps({ dateObj })}>
                    {date.getDate()}
                  </Button>
                ) : null}
              </WrapItem>
            )
          }),
        )}
      </Wrap>
    </Box>
  )
}

export default CalendarBodyDates
