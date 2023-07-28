import { Grid, GridItem, HStack } from '@chakra-ui/react'
import SubregionIndicator from '@/components/atoms/SubregionIndicator/SubregionIndicator'
import { SubRegion } from '@/@types/geojson'
import { AutoComplete } from '@/components/molecules/AutoComplete/AutoComplete'
import { TimeframesData } from '@/@types/Timeframe'
import { useActions, useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'

interface IssuedRetiredChartHeaderProps {
  autocompleteItems: { value: string; label: string }[]
}

const IssuedRetiredChartHeader: FC<IssuedRetiredChartHeaderProps> = (props) => {
  const { setCountry, setSubRegion, setTimeframe } = useActions().creditsHistory
  const { dataFilters } = useAppState().creditsHistory
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)

  const { autocompleteItems } = props

  const getCountryPlaceholder = (country: string | undefined): string => {
    if (country) {
      return countryTranslate(`${country}`)
    }
    return t(`regions.chooseCountry`)
  }

  return (
    <Grid
      id={`issued-retired-chart-header`}
      templateAreas={`
              'title continents-filter'
              'date-range-filter date-range-filter'
            `}
      gridTemplateColumns={`auto 1fr`}
      rowGap={`16px`}
      alignItems={`center`}
    >
      <GridItem area={`title`} borderRight={`1px`} borderRightColor={`lightGray.400`} padding={`8px 16px `}>
        <SubregionIndicator subregion={dataFilters?.region} clearSubregion={() => setSubRegion(SubRegion.WORLD)} />
      </GridItem>
      <GridItem area={`continents-filter`} alignSelf={`center`} padding={`4px `}>
        <HStack padding={`4px 16px`} gap={`8px`} alignContent={`baseline`}>
          {dataFilters.region === SubRegion.WORLD ? (
            <AutoComplete
              onItemClick={(region) => setSubRegion(region.value)}
              onItemHover={(_) => undefined}
              onDropDownLeave={() => undefined}
              items={autocompleteItems}
              placeholder={t(`regions.chooseRegion`)}
            />
          ) : (
            <AutoComplete
              onItemClick={(country) => setCountry(country.value)}
              onItemHover={(_) => undefined}
              onDropDownLeave={() => undefined}
              items={autocompleteItems}
              placeholder={getCountryPlaceholder(dataFilters.country)}
            />
          )}
        </HStack>
      </GridItem>
      <GridItem area={`date-range-filter`}>
        <HStack padding={`4px 16px`} gap={`8px`}>
          {Object.values(TimeframesData).map((timeFrameName, idx) => (
            <SelectableChip
              label={t(`timeframes.${timeFrameName}`)}
              key={`issued-retired-${timeFrameName}`}
              isSelected={dataFilters.timeframe === timeFrameName}
              onClick={() => setTimeframe(timeFrameName)}
            />
          ))}
        </HStack>
      </GridItem>
    </Grid>
  )
}

export default IssuedRetiredChartHeader
