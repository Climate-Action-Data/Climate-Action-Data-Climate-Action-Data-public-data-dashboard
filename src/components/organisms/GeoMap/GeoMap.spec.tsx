import renderer, { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'
import GeoMap from './GeoMap'
import { SubRegion } from '@/@types/geojson'
import { TestOvermindWrapper } from '@/components/atoms/TestOvermindWrapper/TestOvermindWrapper'

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
})
