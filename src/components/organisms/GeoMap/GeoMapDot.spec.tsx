import renderer, { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'

import GeoMapDot from './GeoMapDot'
import { Country, SubRegion } from '@/@types/geojson'

describe(`GeoMapDot component`, () => {
  let component: ReactTestRenderer
  let country: Country

  const onHoverChange = jest.fn((c) => {
    country = c
  })

  const onClick = jest.fn((c) => {
    country = c
  })

  beforeAll(() => {
    component = renderer.create(<GeoMapDot x={0} y={0} countryAlpha3={`FRA`} hoveredRegion={``} selectedRegion={``} onHoverChange={onHoverChange} onClick={onClick} />)
  })

  it(`renders correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it(`calls the provided callback method when mouse is over`, () => {
    const tree = (component.toJSON() as ReactTestRendererJSON[])[0]

    renderer.act(() => {
      tree.props.onMouseOver()
    })

    expect(onHoverChange).toHaveBeenCalled()
    expect(country.alpha3).toBe(`FRA`)
  })

  it(`calls the provided callback method when mouse leaves`, () => {
    const tree = (component.toJSON() as ReactTestRendererJSON[])[0]

    renderer.act(() => {
      tree.props.onMouseLeave()
    })

    expect(onHoverChange).toHaveBeenCalled()
    expect(country).toBeUndefined()
  })

  it(`calls the provided callback method when clicked`, () => {
    const tree = (component.toJSON() as ReactTestRendererJSON[])[0]

    renderer.act(() => {
      tree.props.onClick()
    })

    expect(onClick).toHaveBeenCalled()
    expect(country.alpha3).toBe(`FRA`)
  })

  it(`renders differently when currently selected region is the same as dot's sub region`, () => {
    component = renderer.create(
      <GeoMapDot
        x={0}
        y={0}
        countryAlpha3={`FRA`}
        subRegion={SubRegion.WESTERN_EUROPE}
        hoveredRegion={SubRegion.WESTERN_EUROPE}
        selectedRegion={SubRegion.WESTERN_EUROPE}
        onHoverChange={onHoverChange}
        onClick={onClick}
      />,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
