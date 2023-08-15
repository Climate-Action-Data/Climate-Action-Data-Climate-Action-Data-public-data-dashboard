import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import { DateFormats } from '@/@types/DateFormats'
import { YEAR_INPUT_REGEX } from '@/@types/Regex'

interface YearInputProp {
  label: string
  value: number | undefined
  maxYear?: number
  minYear?: number
  onChange: (year: number | undefined) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const YearInput: FC<YearInputProp> = (prop) => {
  const { label, value, maxYear, minYear, onChange, onKeyDown } = prop

  const [textInputValue, setTextInputValue] = useState<string>(``)
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  useEffect(() => {
    setTextInputValue(value ? value?.toString() : ``)
  }, [value])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === ``) {
      setTextInputValue(value)
    }

    if (YEAR_INPUT_REGEX.test(value)) {
      setTextInputValue(value)
    }
  }

  const updateValue = () => {
    if (textInputValue === ``) {
      setIsInvalid(false)
      onChange(undefined)
    }

    if (!YEAR_INPUT_REGEX.exec(textInputValue)) {
      setIsInvalid(true)
    }

    const yearNumber = parseInt(textInputValue)
    if ((maxYear && yearNumber > maxYear) || (minYear && yearNumber < minYear)) {
      setIsInvalid(true)
    }

    setIsInvalid(false)
    onChange(yearNumber)
  }

  const handleOnBlur = () => {
    updateValue()
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter`) {
      console.log(`===========   ${textInputValue}`)
      updateValue()
      onKeyDown(event)
    }
  }

  return (
    <VStack alignItems="start">
      <Text>{label}</Text>
      <InputGroup width="143px" alignItems="top">
        <Input
          variant="yearInput"
          placeholder={DateFormats.YYYY}
          borderBottomColor="lightGray.600"
          value={textInputValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          isInvalid={isInvalid}
          errorBorderColor="red"
          onKeyDown={handleOnKeyDown}
        />
      </InputGroup>
    </VStack>
  )
}

export default YearInput
