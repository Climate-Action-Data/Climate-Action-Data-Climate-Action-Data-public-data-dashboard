import renderer, { ReactTestRenderer } from 'react-test-renderer'
import GeoMapDemo from './GeoMapDemo'

describe(`GeoMapDemo component`, () => {
  let component: ReactTestRenderer

  beforeAll(() => {
    component = renderer.create(<GeoMapDemo />)
  })

  it(`renders correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
