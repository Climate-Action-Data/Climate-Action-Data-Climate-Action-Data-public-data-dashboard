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
}

const YearInput: FC<YearInputProp> = (prop) => {
  const { label, value, maxYear, minYear, onChange } = prop

  const [textInputValue, setTextInputValue] = useState<string>(``)
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  useEffect(() => {
    setTextInputValue(value ? value?.toString() : ``)
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
    if (value === ``) {
      setTextInputValue(value)
    }

    console.log(YEAR_INPUT_REGEX.test(value))
    console.log(value)
    console.log(YEAR_INPUT_REGEX.test(value))
    if (YEAR_INPUT_REGEX.test(value)) {
      setTextInputValue(value)
    }
  }

  const handleOnBlur = () => {
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

  return (
    <VStack alignItems={`start`}>
      <Text>{label}</Text>
      <InputGroup width={`143px`} alignItems={`top`}>
        <Input
          placeholder={DateFormats.YYYY}
          borderBottomColor={`lightGray.600`}
          value={textInputValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          isInvalid={isInvalid}
          errorBorderColor={`red`}
          sx={{ ...inputConfig }}
        />
      </InputGroup>
    </VStack>
  )
}

export default YearInput
