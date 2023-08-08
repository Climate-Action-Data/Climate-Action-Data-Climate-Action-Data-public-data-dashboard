import { Calendar, GetDatePropsOptions } from 'dayzed'
import { Box, Button, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, ReactElement } from 'react'
import { getWeekdayNames } from '@/@types/Calendar'

interface CalendarBodyDatesProps {
  calendar: Calendar
  getDateProps: (data: GetDatePropsOptions) => Record<string, any>
}

const CalendarBodyDates: FC<CalendarBodyDatesProps> = (props) => {
  const { calendar, getDateProps } = props

  const weekDayNames = getWeekdayNames()

  const generateDateColor = (today: boolean, selected: boolean, selectable: boolean) => {
    let background = today ? `lightGray.200` : `transparent`
    background = selected ? `lightGray.800` : background
    return !selectable ? `transparent` : background
  }

  const generateDateElements = () => {
    const result: ReactElement[] = []

    calendar.weeks.forEach((week, weekIndex) =>
      week.forEach((dateObj, index) => {
        const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
        if (dateObj === ``) {
          result.push(<WrapItem key={key} width={`calc(100% / 7)`} />)
        } else {
          const { date, selected, selectable, today } = dateObj
          const background = generateDateColor(today, selected, selectable)
          result.push(
            <WrapItem key={key} boxSize={`48px`} justifyContent={`center`}>
              {selectable ? (
                <Button variant={`calendarDate`} color={selected ? `white` : `black`} backgroundColor={background} {...getDateProps({ dateObj })}>
                  {date.getDate()}
                </Button>
              ) : (
                <Button variant={`calendarDate`} color={selected ? `white` : `black`} isDisabled backgroundColor={background} {...getDateProps({ dateObj })}>
                  {date.getDate()}
                </Button>
              )}
            </WrapItem>,
          )
        }
      }),
    )
    return result
  }

  const dateElements = generateDateElements()

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
      <Wrap spacing={0}>{dateElements}</Wrap>
    </Box>
  )
}

export default CalendarBodyDates
