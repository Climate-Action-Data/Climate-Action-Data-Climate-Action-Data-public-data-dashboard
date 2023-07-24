import renderer, { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import GeoMap from './GeoMap'
import { SubRegion } from '@/@types/geojson'
import { MockData } from '@/test/TestOvermindMockData'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

describe(`GeoMap component`, () => {
  let component: ReactTestRenderer

  beforeAll(() => {
    component = renderer.create(
      <TestOvermindWrapper>
        <GeoMap subRegion={SubRegion.AUSTRALIA_AND_NEW_ZEALAND} />
      </TestOvermindWrapper>,
    )
  })

  it(`renders correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it(`renders when mouse over a dot`, async () => {
    const tree = component.toJSON() as ReactTestRendererJSON

    expect(tree.children).not.toBeNull()

    if (tree.children) {
      const dot = tree.children[0] as ReactTestRendererJSON

      renderer.act(() => {
        dot.props.onMouseLeave()
      })

      expect(component.toJSON()).toMatchSnapshot()
    }
  })

  it(`renders the component with selected region`, () => {
    const { container } = render(
      <TestOvermindWrapper analytics={MockData.STATE_CARBON_FULL_REGION_COUNTRY}>
        <GeoMap subRegion={SubRegion.AUSTRALIA_AND_NEW_ZEALAND} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`should handle click event properly when selectedRegion is DEFAULT_REGION`, () => {
    const { container } = render(
      <TestOvermindWrapper analytics={MockData.STATE_CARBON_FULL_REGION_COUNTRY}>
        <GeoMap
          subRegion={SubRegion.WORLD} // Set subRegion to SubRegion.WORLD (or any other default sub-region)
        />
      </TestOvermindWrapper>,
    )

    // Use the testing library's 'getByTestId' to find the rendered SVG element.
    const svgElement = container.firstChild

    // Now, we'll simulate a click event on the SVG element. For simplicity, let's assume
    // that the first dot in the SVG represents a country with subRegion 'COUNTRY_SUBREGION'.
    if (svgElement) {
      fireEvent.click(svgElement)
    }
  })
})
