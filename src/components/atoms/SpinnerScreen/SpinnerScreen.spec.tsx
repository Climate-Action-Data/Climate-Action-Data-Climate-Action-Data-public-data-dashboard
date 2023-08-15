import { render } from '@testing-library/react'
import { SpinnerScreen } from './SpinnerScreen'

const DEFAULT_MESSAGE = `Loading...`

describe(`SpinnerScreen`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<SpinnerScreen />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly`, () => {
    const { container } = render(<SpinnerScreen message={DEFAULT_MESSAGE} />)
    expect(container).toMatchSnapshot()
  })
})
