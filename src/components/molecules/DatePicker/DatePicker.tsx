import { Flex, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { CalenderIcon } from '@/components/atoms/CalenderIcon/CalenderIcon'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'

interface DatePickerProps {
  label: string
  date: Date | undefined
  onChange: (date: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { label, onChange, date, minDate, maxDate } = props
  const propsConfigs = {
    inputProps: {
      'data-testid': `date-picker`,
      margin: 0,
      lineHeight: `0`,
      padding: `4px`,
      height: `min-content`,
      border: `none`,
      borderRadius: 0,
      borderBottom: `1px solid`,
      borderBottomColor: `lightGray.500`,
      placeholder: `yyyy/mm/dd`,
      _placeholder: {
        color: `lightGray.600`,
      },
      _focus: {
        boxShadow: `none`,
      },
    },
    dayOfMonthBtnProps: {
      defaultBtnProps: {
        fontWeight: `normal`,
        boxSize: `40px`,
        fontSize: `16px`,
        borderRadius: `50%`,
        _hover: { color: `black`, borderRadius: `50%`, backgroundColor: `lightGray.300` },
      },
      selectedBtnProps: {
        color: `white`,
        backgroundColor: `lightGray.900`,
        _hover: { color: `black`, borderRadius: `50%`, backgroundColor: `lightGray.300` },
      },
    },
    dateHeadingProps: { fontFamily: `body`, fontWeight: `medium` },
    popoverCompProps: {
      popoverContentProps: { fontFamily: `body`, border: `none`, borderRadius: `8px` },
      popoverBodyProps: { padding: 0, border: `none`, _focus: { border: `none` } },
    },
    dateNavBtnProps: { boxSize: `40px`, borderRadius: `50%`, _hover: { backgroundColor: `lightGray.300` } },
  }
  const configs = {
    dayNames: [`S`, `M`, `T`, `W`, `T`, `F`, `S`],
    monthNames: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
  }

  return (
    <VStack alignItems={`start`} gap={`8px`}>
      <Text>{label}</Text>
      <Flex>
        <Flex position={`relative`} width={`100%`} alignItems={`end`}>
          <CalenderIcon color={`lightGray.600`} position={`absolute`} right={0} bottom={`0`} margin={`4px`} />
          <SingleDatepicker
            propsConfigs={propsConfigs}
            configs={configs}
            onDateChange={(selectedDate) => {
              onChange(selectedDate)
            }}
            date={date}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Flex>
        {date && (
          <Flex alignItems={`end`}>
            <CloseIcon data-testid={`clear-date`} pointerEvents={`auto`} cursor={`pointer`} margin={`2px`} onClick={() => onChange(undefined)} color={`red`} />
          </Flex>
        )}
      </Flex>
    </VStack>
  )
}

export default DatePicker
