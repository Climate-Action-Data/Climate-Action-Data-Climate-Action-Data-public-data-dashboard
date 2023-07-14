import renderer, { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'
import GeoMap from './GeoMap'
import { SubRegion } from '@/@types/geojson'

describe(`GeoMap component`, () => {
  let component: ReactTestRenderer

  beforeAll(() => {
    component = renderer.create(<GeoMap subRegion={SubRegion.AUSTRALIA_AND_NEW_ZEALAND} />)
  })

  it(`renders correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it(`renders when mouse hovers a dot`, async () => {
    const tree = component.toJSON() as ReactTestRendererJSON

    expect(tree.children).not.toBeNull()

    if (tree.children) {
      const dot = tree.children[0] as ReactTestRendererJSON

      renderer.act(() => {
        dot.props.onMouseOver()
      })

      expect(component.toJSON()).toMatchSnapshot()
    }
  })

  it(`renders when mouse leaves a dot`, async () => {
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

  it(`renders when mouse hovers a dot on world view`, async () => {
    component = renderer.create(<GeoMap />)

    const tree = component.toJSON() as ReactTestRendererJSON

    expect(tree.children).not.toBeNull()

    if (tree.children) {
      const dot = tree.children[0] as ReactTestRendererJSON

      renderer.act(() => {
        dot.props.onMouseOver()
      })

      expect(component.toJSON()).toMatchSnapshot()
    }
  })

  it(`renders when mouse leaves a dot on world view`, async () => {
    component = renderer.create(<GeoMap />)

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

  it(`renders when mouse clicks a dot`, async () => {
    const tree = component.toJSON() as ReactTestRendererJSON

    expect(tree.children).not.toBeNull()
    if (tree.children) {
      const dot = tree.children[0] as ReactTestRendererJSON

      renderer.act(() => {
        dot.props.onClick()
      })

      expect(component.toJSON()).toMatchSnapshot()
    }
  })

  it(`renders when mouse clicks a dot with dot's sub region currently selected`, async () => {
    component = renderer.create(<GeoMap subRegion={SubRegion.NORTHERN_AMERICA} />)

    const tree = component.toJSON() as ReactTestRendererJSON

    expect(tree.children).not.toBeNull()

    if (tree.children) {
      const dot = tree.children[0] as ReactTestRendererJSON

      renderer.act(() => {
        dot.props.onClick()
      })

      expect(component.toJSON()).toMatchSnapshot()
    }
  })
})
