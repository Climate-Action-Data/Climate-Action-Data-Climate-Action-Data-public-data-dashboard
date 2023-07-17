import { SubRegion } from '@/@types/geojson'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Flex, Text, Box, Divider, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AutoComplete } from '../AutoComplete/AutoComplete'

export const RegionSearch = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)

  const { carbonReduction } = useAppState().analytics
  const { setSubRegion, setHoverSubRegion } = useActions().analytics
  const { generateCountryByRegion } = useEffects().analytics

  const getSearchItems = (): {
    value: string
    label: string
  }[] => {
    if (carbonReduction?.data?.carbonMapSelectedRegion && carbonReduction.data.carbonMapSelectedRegion !== SubRegion.WORLD) {
      const test = generateCountryByRegion(carbonReduction.data.carbonMapSelectedRegion).map((country) => ({
        value: country,
        label: countryTranslate(`${country}`),
      }))
      console.dir(test)
      return test
    } else {
      return Object.values(SubRegion).map((region) => ({
        value: region,
        label: t(`regions.${region}`),
      }))
    }
  }

  const regionTitle = () => {
    if (carbonReduction?.data?.carbonMapSelectedRegion && carbonReduction?.data?.carbonMapSelectedRegion !== SubRegion.WORLD) {
      return (
        <Flex alignItems={`center`}>
          <Button variant="lightGrayRound" marginRight={4} data-testid="button-region-back" onClick={() => setSubRegion(SubRegion.WORLD)}>
            &lt;
          </Button>
          <Text fontWeight={`bold`}>{t(`regions.${carbonReduction?.data?.carbonMapSelectedRegion}`)}</Text>
        </Flex>
      )
    } else {
      return (
        <Box>
          <Text fontWeight={`bold`}>Region</Text>
        </Box>
      )
    }
  }
  return (
    <Flex height="auto" alignItems={`center`}>
      {regionTitle()}
      <Divider marginX={6} height={`70px`} orientation="vertical" />
      {carbonReduction?.data?.carbonMapSelectedRegion && carbonReduction?.data?.carbonMapSelectedRegion !== SubRegion.WORLD ? (
        <AutoComplete onItemClick={(region) => console.log(region)} items={getSearchItems()} placeholder="Choose a Country" />
      ) : (
        <AutoComplete
          onItemHover={(region) => setHoverSubRegion(region.value)}
          onDropDownLeave={() => setHoverSubRegion(``)}
          onItemClick={(region) => setSubRegion(region.value)}
          items={getSearchItems()}
          placeholder={t(`regions.${carbonReduction?.data?.carbonMapHoveredRegion}`)}
        />
      )}
    </Flex>
  )
}
