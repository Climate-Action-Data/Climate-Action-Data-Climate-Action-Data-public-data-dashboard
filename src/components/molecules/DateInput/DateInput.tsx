import { ChangeEvent, FC, useEffect, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { CalendarIcon } from '@/components/atoms/CalendarIcon/CalendarIcon'
import { DateFormats } from '@/@types/DateFormats'
import { DATE_INPUT_REGEX } from '@/@types/Regex'

interface DateInputProp {
  label: string
  onOpenDatePicker: () => void
  value: Date | undefined
  maxDate?: Date
  minDate?: Date
  onChange: (date: Date | undefined) => void
}

const DateInput: FC<DateInputProp> = (prop) => {
  const { onOpenDatePicker, label, value, minDate, maxDate, onChange } = prop

  const [textInputValue, setTextInputValue] = useState<string>(``)
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  useEffect(() => {
    if (value) {
      setTextInputValue(format(value, DateFormats.YYYY_MM_DD))
    } else {
      setTextInputValue(``)
    }
  }, [value])

  const inputConfig = {
    height: `28px`,
    padding: 0,
    _active: { boxShadow: `none` },
    border: `none`,
    borderRadius: 0,
    borderBottom: `solid`,
    borderBottomWidth: `1px`,
    _placeholder: { color: `lightGray.600` },
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    value.match(DATE_INPUT_REGEX) && setTextInputValue(value)
  }

  const handleOnBlur = () => {
    if (textInputValue === ``) {
      setIsInvalid(false)
      onChange(undefined)
      return
    }

    const parsedDate = parse(textInputValue, DateFormats.YYYY_MM_DD, new Date())

    if (!isValid(parsedDate)) {
      setIsInvalid(true)
      return
    }
    if ((maxDate && parsedDate > maxDate) || (minDate && parsedDate < minDate)) {
      setIsInvalid(true)
      return
    }
    setIsInvalid(false)
    onChange(parsedDate)
  }

  return (
    <VStack alignItems={`start`}>
      <Text>{label}</Text>
      <InputGroup width={`143px`} alignItems={`top`}>
        <InputRightElement boxSize={`24px`}>
          <CalendarIcon color={`lightGray.600`} cursor={`pointer`} onClick={onOpenDatePicker} data-testid={`datepicker-trigger`} />
        </InputRightElement>
        <Input
          placeholder={DateFormats.YYYY_MM_DD}
          borderBottomColor={`lightGray.600`}
          value={textInputValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onEnded={handleOnBlur}
          isInvalid={isInvalid}
          errorBorderColor={`red`}
          sx={{ ...inputConfig }}
        />
      </InputGroup>
    </VStack>
  )
}

export default DateInput
