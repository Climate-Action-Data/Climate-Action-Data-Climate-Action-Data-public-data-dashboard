import { render } from '@testing-library/react'
import LoginInformationContainer from './LoginInformationContainer'

describe(`LoginInformationContainer`, () => {
  it(`renders correctly`, () => {
    const { asFragment } = render(<LoginInformationContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
