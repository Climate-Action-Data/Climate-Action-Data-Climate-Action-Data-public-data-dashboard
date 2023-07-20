import renderer, { ReactTestRenderer } from 'react-test-renderer'

import GeoMapDemo from './GeoMapDemo'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

describe(`GeoMapDemo component`, () => {
  let component: ReactTestRenderer

  beforeAll(() => {
    component = renderer.create(
      <TestOvermindWrapper>
        <GeoMapDemo />
      </TestOvermindWrapper>,
    )
  })

  it(`renders correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
