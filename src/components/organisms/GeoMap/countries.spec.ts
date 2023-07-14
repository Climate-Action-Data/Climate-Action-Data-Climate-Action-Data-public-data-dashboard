import { findCountry } from './countries'

describe(`Countries repository`, () => {
  it(`returns an existing country if exists`, () => {
    const country = findCountry(`FRA`)
    expect(country.alpha3).toBe(`FRA`)
    expect(country.countryCode).toBe(`250`)
    expect(country.iso31662).toBe(`ISO 3166-2:FR`)
  })

  it(`returns a mocked country if not exists`, () => {
    const country = findCountry(`XXX`)
    expect(country.alpha3).toBe(`XXX`)
    expect(country.countryCode).toBeUndefined()
    expect(country.iso31662).toBeUndefined()
  })
})
