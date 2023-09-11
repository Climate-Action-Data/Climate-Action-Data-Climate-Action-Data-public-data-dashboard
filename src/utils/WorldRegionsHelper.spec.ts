// create tests for getWorldRegionList

import { useTranslation } from 'react-i18next'
import { getWorldRegionList } from './WorldRegionsHelper'
import { MockRegionsData } from '../test/mock-data/world_regions_data'

jest.mock(`react-i18next`, () => ({
  useTranslation: jest.fn(),
}))

describe(`getWorldRegionList`, () => {
  const useTranslationSpy = useTranslation as jest.Mock

  beforeAll(() => {
    useTranslationSpy.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        language: `en`,
      },
    })
  })

  it(`should return a list of world regions`, () => {
    const { t } = useTranslation(`home`)
    const result = getWorldRegionList(t)

    expect(result).toEqual(MockRegionsData)
  })
})
