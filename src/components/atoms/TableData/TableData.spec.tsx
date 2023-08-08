import { render } from '@testing-library/react'
import { TableData } from './TableData'

describe(`TableData`, () => {
  it(`renders correctly with string data`, () => {
    const { container } = render(<TableData data={`hello`} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with number data`, () => {
    const { container } = render(<TableData data={1} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with undefined data`, () => {
    const { container } = render(<TableData data={undefined} />)
    expect(container).toMatchSnapshot()
  })
})
