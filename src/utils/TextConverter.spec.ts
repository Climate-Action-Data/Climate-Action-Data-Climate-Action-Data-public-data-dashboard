import { extractTitleFromUrl, capitalizeString } from './TextConverter'

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
