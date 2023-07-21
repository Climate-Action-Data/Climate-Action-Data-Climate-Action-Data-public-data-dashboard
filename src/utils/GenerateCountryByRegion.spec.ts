import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import { SubRegion } from '@/@types/geojson'

it(`generate countries for `, () => {
  expect(generateCountryByRegion(SubRegion.CENTRAL_ASIA)).toStrictEqual([`KAZ`, `KGZ`, `TJK`, `TKM`, `UZB`])
})
