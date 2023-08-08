import { generateRandomString } from './GenerationHelpers'

const DEFAULT_LENGTH = 10
const DEFAULT_LENGTH_2 = 15

describe(`generateRandomString`, () => {
  test(`generateRandomString of no length`, () => {
    expect(generateRandomString().length).toBe(DEFAULT_LENGTH)
  })

  test(`generateRandomString of 5 chars`, () => {
    expect(generateRandomString(DEFAULT_LENGTH).length).toBe(DEFAULT_LENGTH)
  })

  test(`generateRandomString of 5 chars`, () => {
    expect(generateRandomString(DEFAULT_LENGTH_2).length).toBe(DEFAULT_LENGTH_2)
  })
})
