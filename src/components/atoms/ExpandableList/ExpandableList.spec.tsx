import { fireEvent, render, screen } from '@testing-library/react'
import { ExpandableList } from './ExpandableList'

const ITEMS = [`item1`, `item2`, `item3`, `item4`, `item5`]

describe(`ProjectDetailsVerificationList`, () => {
  it(`renders correctly with full array`, () => {
    const { container } = render(<ExpandableList items={ITEMS} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with full array and limit`, () => {
    const { container } = render(<ExpandableList items={ITEMS} itemLimit={2} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with full array and click`, () => {
    const { container } = render(<ExpandableList items={ITEMS} />)
    const expandButton = screen.getByTestId(`verification-expand`)
    fireEvent.click(expandButton)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<ExpandableList items={[]} />)
    expect(container).toMatchSnapshot()
  })
})
