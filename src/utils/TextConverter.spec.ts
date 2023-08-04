import { EWebGoal } from '@/@types/EWebGoal'
import { extractTitleFromUrl, capitalizeString, extractEWebGoalFromString, sanitizeString, extractProjectTypeFromString } from './TextConverter'
import { ProjectType } from '@/@types/ProjectDetails'

const TEST_FULL_CAP = `LOREM`
const TEST_CAP = `Lorem`
const TEST_LOWER = `lorem`

describe(`capitalizeString`, () => {
  test(`convert uppercase to capitalized`, () => {
    expect(capitalizeString(TEST_FULL_CAP)).toBe(TEST_CAP)
  })

  test(`convert capitalized to capitalized`, () => {
    expect(capitalizeString(TEST_CAP)).toBe(TEST_CAP)
  })

  test(`convert lowercase to capitalized`, () => {
    expect(capitalizeString(TEST_LOWER)).toBe(TEST_CAP)
  })
})

const URL = `/lorem/ipsum`
const URL_VOID = `/`
const TITLE = `Ipsum`
const DEFAULT = ``

describe(`extractTitleFromUrl`, () => {
  test(`extract title from url`, () => {
    expect(extractTitleFromUrl(URL)).toBe(TITLE)
  })

  test(`extract title from coid url to be default`, () => {
    expect(extractTitleFromUrl(URL_VOID)).toBe(DEFAULT)
  })
})
const DEFAULT_EWEBGOAL = `SDG 1 - No Poverty`
const DEFAULT_EWEBGOAL_FAKE = `SDG 19 - No Poverty`
const DEFAULT_EWEBGOAL_RANDOM = `Muy random`

describe(`extractEWebGoalFromString`, () => {
  test(`extract ewebgoal from string`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL)).toBe(EWebGoal.SDG1)
  })

  test(`extract ewebgoal from string to be undefined`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL_FAKE)).toBeUndefined()
  })

  test(`extract ewebgoal from random string to be undefined`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL_RANDOM)).toBeUndefined()
  })
})

const DEFAULT_STRING = `energy`
const DEFAULT_STRING_CAP = `Energy`
const DEFAULT_STRING_CAP_SPECIAL = `Energy &`

describe(`sanitizeString`, () => {
  test(`sanitize string`, () => {
    expect(sanitizeString(DEFAULT_STRING)).toBe(DEFAULT_STRING)
  })

  test(`sanitize string to be undefined`, () => {
    expect(sanitizeString(DEFAULT_STRING_CAP)).toBe(DEFAULT_STRING)
  })

  test(`sanitize random string to be undefined`, () => {
    expect(sanitizeString(DEFAULT_STRING_CAP_SPECIAL)).toBe(DEFAULT_STRING)
  })
})

const DEFAULT_TYPE_STRING = `Improved Forest Management`

describe(`extractProjectTypeFromString`, () => {
  test(`extract project type from string`, () => {
    expect(extractProjectTypeFromString(DEFAULT_TYPE_STRING)).toBe(ProjectType.IMPROVED_FOREST_MANAGEMENT)
  })

  test(`extract project type from string to be default`, () => {
    expect(extractProjectTypeFromString(DEFAULT_STRING)).toBe(ProjectType.DEFAULT)
  })
})
