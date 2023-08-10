import { render } from '@testing-library/react'
import { NoDataScreen } from './NoDataScreen'

const DEFAULT_TEST_MESSAGE = `No data available`

describe(`RetirementDetails`, () => {
  it(`renders correctly with message`, () => {
    const { container } = render(<NoDataScreen message={DEFAULT_TEST_MESSAGE} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with no message`, () => {
    const { container } = render(<NoDataScreen />)
    expect(container).toMatchSnapshot()
  })
})
