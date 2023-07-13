/* eslint no-magic-numbers: off */

import fs from 'fs'
import Case from 'case'

import countries from './geo-utils/countries.json'
import _ from 'lodash'

const CONTINENTS_FILE_PATH = `./src/geo-utils/continents.json`

const generateContinentsFileAction = () => {
  const subRegionsMap = new Map<string, string[]>()

  subRegionsMap.set(`world`, [])

  countries.forEach((country) => {
    const subRegion = Case.kebab(country[`sub-region`])

    if (!subRegionsMap.get(subRegion)) {
      subRegionsMap.set(subRegion, new Array<string>())
    }

    subRegionsMap.get(subRegion)?.push(country[`alpha-3`])
  })

  const subRegions = new Array<MapSubRegion>()

  console.log(`--------     SUB REGION ENUM    --------`)
  subRegionsMap.forEach((countryCodes, subRegion) => {
    if (_.isEmpty(subRegion)) {
      return
    }

    console.log(`${Case.constant(subRegion)} = \`${Case.kebab(subRegion)}\`,`)

    subRegions.push({
      name: subRegion,
      countries: countryCodes,
    })
  })
  console.log(`--------      SUB REGION ENUM    --------`)

  fs.writeFileSync(CONTINENTS_FILE_PATH, JSON.stringify(subRegions))
}

export default generateContinentsFileAction
