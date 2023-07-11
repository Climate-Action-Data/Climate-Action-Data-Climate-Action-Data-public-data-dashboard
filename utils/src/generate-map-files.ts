import fs from 'fs'
import prompt from 'prompt'

import continents from './geo-utils/continents.json'
import { getMap } from './geo-utils/geo-map-utils'

const CONTINENTS_DOTS_FILE_PATH = `../src/assets/geo-map/continents-dots.ts`
const COUNTRY_CONTINENT_MAPPING_FILE_PATH = `../src/assets/geo-map/countries-continents-mapping.ts`

const generateMapFilesPromptSchema = {
  properties: {
    gridHeight: {
      pattern: /\d{1,3}/,
      message: `Grid height must be an integer. The bigger the heavier.`,
      default: 80,
    },
    gridWidth: {
      pattern: /\d{1,3}/,
      message: `Grid width must be an integer. The bigger the heavier.`,
      default: 0,
    },
  },
}

const generateMapFiles = (gridHeight?: number, gridWidth?: number) => {
  fs.writeFileSync(CONTINENTS_DOTS_FILE_PATH, `export default {`, { flag: `w` })
  fs.writeFileSync(COUNTRY_CONTINENT_MAPPING_FILE_PATH, `export default new Map<string, string>([`, { flag: `w` })

  continents.forEach((continent) => {
    console.log(`Computing area "${continent.name}"`)

    continent.countries.forEach((country) => {
      fs.writeFileSync(COUNTRY_CONTINENT_MAPPING_FILE_PATH, `["${country}", "${continent.name}"],`, { flag: `a` })
    })

    const map = getMap({
      gridHeight: gridHeight,
      gridWidth: gridWidth,
      countries: continent.countries,
      grid: `vertical`,
    })

    fs.writeFileSync(CONTINENTS_DOTS_FILE_PATH, `\n"${continent.name}": ${JSON.stringify(map)},`, { flag: `a` })
  })

  fs.writeFileSync(CONTINENTS_DOTS_FILE_PATH, `\n}`, { flag: `a` })
  fs.writeFileSync(COUNTRY_CONTINENT_MAPPING_FILE_PATH, `\n])`, { flag: `a` })
}

const generateMapFilesAction = () => {
  console.log(`\n--- GENERATE MAP SUPPORT FILES ---`)

  prompt.get(generateMapFilesPromptSchema, (err, result) => {
    if (!err) {
      const gridHeight = parseInt(result.gridHeight as string)
      const gridWidth = parseInt(result.gridWidth as string)

      if (!gridHeight || !gridWidth) {
        console.log(`You must provide at least a grid height or width`)
        generateMapFilesAction()
      }

      console.log(`\n`)

      generateMapFiles(gridHeight, gridWidth)

      process.exit(0)
    }
  })
}

export default generateMapFilesAction
