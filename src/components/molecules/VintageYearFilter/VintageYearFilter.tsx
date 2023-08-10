import { Button, Flex, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spacer, VStack } from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { FC, useEffect, useState } from 'react'
import { MinusIcon } from '@/components/atoms/MinusIcon/MinusIcon'
import { useTranslation } from 'react-i18next'
import { YearsFilter } from '@/@types/ProjectSearchFilterValues'
import YearInput from '@/components/molecules/YearInput/YearInput'

interface VintageYearFilterProp {
  label: string
  earliestYear?: number
  latestYear?: number
  yearFilter?: YearsFilter
  onYearChange: (payload: YearsFilter) => void
  isResultsPage?: boolean
}

const VintageYearFilter: FC<VintageYearFilterProp> = (prop) => {
  const { label, earliestYear, latestYear, onYearChange, yearFilter, isResultsPage } = prop

  const [minimumYear, setMinimumYear] = useState<number | undefined>()
  const [maximumYear, setMaximumYear] = useState<number | undefined>()

  const { t } = useTranslation(`search`)

  useEffect(() => {
    setMinimumYear(yearFilter?.minYear)
    setMaximumYear(yearFilter?.maxYear)
  }, [yearFilter])

  const handleOnClearClick = () => {
    setMinimumYear(undefined)
    setMaximumYear(undefined)
    onYearChange({})
  }

  const handleOnApplyClick = () => {
    if (minimumYear && maximumYear) {
      if (minimumYear <= maximumYear) {
        onYearChange({ maxYear: maximumYear, minYear: minimumYear })
      }
    } else if (minimumYear) {
      onYearChange({ minYear: minimumYear })
    } else if (maximumYear) {
      onYearChange({ maxYear: maximumYear })
    }
  }

  const handleMinDateOnChange = (year: number | undefined) => {
    setMinimumYear(year)
  }

  const handleMaxDateOnChange = (year: number | undefined) => {
    setMaximumYear(year)
  }

  const renderLabel = () => {
    if (yearFilter?.minYear && yearFilter?.maxYear) {
      return `${yearFilter.minYear} - ${yearFilter.maxYear}`
    }
    if (yearFilter?.minYear) {
      return t(`andLater`, { date: yearFilter.minYear })
    }
    if (yearFilter?.maxYear) {
      return t(`upTo`, { date: yearFilter.maxYear })
    }
    return label
  }

  const generateVariant = () => {
    if (isResultsPage) {
      return yearFilter?.minYear || yearFilter?.maxYear ? `dropdownSelectedDark` : `dropdownUnselectedDark`
    }
    return yearFilter?.minYear || yearFilter?.maxYear ? `dropdownSelected` : `dropdownUnselected`
  }

  return (
    <Popover gutter={0} isLazy placement={`bottom`} matchWidth>
      <PopoverTrigger>
        <Button variant={generateVariant()}>
          <Flex fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {renderLabel()}
            <Spacer />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        zIndex={401}
        border={0}
        borderRadius={`8px`}
        width={[`100%`, null, null, `min-content`]}
        height={`min-content`}
        color={`green.900`}
        backgroundColor={`white`}
        boxShadow={`xl`}
      >
        <PopoverBody width={`100%`}>
          <VStack>
            <HStack width={`100%`} justify={`center`} alignItems={`end`}>
              <YearInput label={`Minimum Date`} value={minimumYear} maxYear={latestYear ?? maximumYear} minYear={earliestYear} onChange={handleMinDateOnChange} />
              <MinusIcon />
              <YearInput label={`Maximum Date`} value={maximumYear} maxYear={latestYear} minYear={earliestYear ?? minimumYear} onChange={handleMaxDateOnChange} />
            </HStack>
            <HStack justify={`space-between`} width={`100%`} margin={`8px`}>
              <Button variant={`textLink`} onClick={handleOnClearClick} data-testid={`vintage-year-filter-clear`}>
                {t(`clear`)}
              </Button>
              <Button variant={`textLink`} onClick={handleOnApplyClick} data-testid={`vintage-year-filter-apply`}>
                {t(`apply`)}
              </Button>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default VintageYearFilter
