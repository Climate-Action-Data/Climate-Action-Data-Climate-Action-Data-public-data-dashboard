import { render } from '@testing-library/react'
import LoginMethodContainer from './LoginMethodContainer'
import { GoogleIcon } from '../../atoms/GoogleIcon/GoogleIcon'

describe(`LoginInformationContainer`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<LoginMethodContainer text="Google" icon={<GoogleIcon />} />)
    expect(container).toMatchSnapshot()
  })
})
