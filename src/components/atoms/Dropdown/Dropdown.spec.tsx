import { render, screen, fireEvent } from '@testing-library/react'
import { Dropdown } from './Dropdown'

const DEFAULT_PLACEHOLDER = `Select an item`
const DEFAULT_ITEMS = [
  { value: `1`, label: `Item 1` },
  { value: `2`, label: `Item 2` },
  { value: `3`, label: `Item 3` },
]

const genericOnItemMock = jest.fn()

describe(`Dropdown`, () => {
  it(`renders correctly on empty`, () => {
    const { container } = render(<Dropdown onItemClick={genericOnItemMock} items={[]} placeholder={DEFAULT_PLACEHOLDER} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on items`, () => {
    const { container } = render(<Dropdown onItemClick={genericOnItemMock} items={DEFAULT_ITEMS} placeholder={DEFAULT_PLACEHOLDER} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on items and open click`, () => {
    const { container } = render(<Dropdown onItemClick={genericOnItemMock} items={DEFAULT_ITEMS} placeholder={DEFAULT_PLACEHOLDER} />)
    fireEvent.click(screen.getByTestId(`dropdown-button`))
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on items and open click on item click`, () => {
    const itemMock = jest.fn()
    const { container } = render(<Dropdown onItemClick={itemMock} items={DEFAULT_ITEMS} placeholder={DEFAULT_PLACEHOLDER} />)
    fireEvent.click(screen.getByTestId(`dropdown-button`))
    const items = screen.getAllByTestId(`dropdown-item`)
    expect(items.length).toBeGreaterThan(0)
    fireEvent.click(items[0])
    expect(itemMock).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
