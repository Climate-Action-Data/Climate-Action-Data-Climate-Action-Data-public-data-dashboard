import { render, fireEvent, screen } from '@testing-library/react'

import { RegionSearch, getCountryPlaceholder } from './RegionSearch'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'

describe(`RegionSearch`, () => {
  test(`renders the component with default state undefined`, () => {
    const { container } = render(
      <TestOvermindWrapper stateData={MockData.STATE_CARBON_FILTERED_UNDEFINED_MAP_DATA_UNDEFINED}>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the component with default state`, () => {
    const { container } = render(
      <TestOvermindWrapper stateData={MockData.STATE_CARBON_FULL}>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the component with a hovered country`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    const autoCompleteInput = screen.getByRole(`textbox`) as HTMLInputElement
    fireEvent.mouseOver(autoCompleteInput)
    expect(container).toMatchSnapshot()
  })

  test(`renders the component with a selected country & region`, () => {
    const { container } = render(
      <TestOvermindWrapper stateData={MockData.STATE_CARBON_FULL_REGION_COUNTRY}>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the component with a selected country & region and clears`, () => {
    const { container, getByTestId } = render(
      <TestOvermindWrapper stateData={MockData.STATE_CARBON_FULL_REGION_COUNTRY}>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    fireEvent.click(getByTestId(`button-region-back`))
    expect(container).toMatchSnapshot()
  })

  test(`renders the component with a selected country & region and clears`, () => {
    const { container, getByTestId } = render(
      <TestOvermindWrapper stateData={MockData.STATE_CARBON_FULL_REGION_COUNTRY}>
        <RegionSearch />
      </TestOvermindWrapper>,
    )
    fireEvent.click(getByTestId(`button-region-back`))
    expect(container).toMatchSnapshot()
  })

  it(`should return placeholder based on carbonMapHoveredCountry when it is empty`, () => {
    const t = jest.fn()
    const countryTranslate = jest.fn().mockReturnValue(`Colombia`)
    const placeholder = getCountryPlaceholder(MockData.STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER.carbonReduction, t, countryTranslate)
    expect(placeholder).toBe(`Colombia`)
    expect(t).toHaveBeenCalled()
    expect(countryTranslate).toHaveBeenCalled()
  })

  it(`should return placeholder based on carbonMapHoveredCountry when it is not empty and different from carbonMapDataFilters.country`, () => {
    const t = jest.fn()
    const countryTranslate = jest.fn().mockReturnValue(`Colombia`)
    const placeholder = getCountryPlaceholder(MockData.STATE_CARBON_FULL_REGION_COUNTRY.carbonReduction, t, countryTranslate)
    expect(placeholder).toBe(`Colombia`)
    expect(t).toHaveBeenCalled()
    expect(countryTranslate).toHaveBeenCalled()
  })
})
