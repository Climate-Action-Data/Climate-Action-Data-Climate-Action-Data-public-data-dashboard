import { render, screen, fireEvent, act } from '@testing-library/react'
import { AutoComplete } from './AutoComplete'

describe(`AutoComplete`, () => {
  const items = [
    { label: `Apple`, value: `apple` },
    { label: `Banana`, value: `banana` },
    { label: `Orange`, value: `orange` },
  ]

  test(`should call onItemClick when an item is clicked`, () => {
    const onItemClick = jest.fn()
    render(<AutoComplete items={items} placeholder="Search" onItemClick={onItemClick} />)

    const inputElement = screen.getByPlaceholderText(`Search`)
    fireEvent.change(inputElement, { target: { value: `a` } }) // Simulate input change

    fireEvent.click(inputElement) // Simulate input click

    const dropdownItem = screen.getByTestId(`dropdown-item-0`)
    fireEvent.click(dropdownItem) // Simulate item click

    expect(onItemClick).toHaveBeenCalledWith(items[0])
  })

  test(`should call onItemHover when mouse enters a dropdown item`, () => {
    const onItemHover = jest.fn()
    render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} onItemHover={onItemHover} />)

    const inputElement = screen.getByPlaceholderText(`Search`)
    fireEvent.click(inputElement) // Open dropdown

    const dropdownItem = screen.getByTestId(`dropdown-item-0`)
    act(() => {
      fireEvent.mouseEnter(dropdownItem) // Simulate mouse enter
    })

    expect(onItemHover).toHaveBeenCalledWith(items[0])
  })

  test(`should call onDropDownLeave when mouse leaves the dropdown`, () => {
    const onDropDownLeave = jest.fn()
    render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} onDropDownLeave={onDropDownLeave} />)

    const inputElement = screen.getByPlaceholderText(`Search`)
    fireEvent.click(inputElement) // Open dropdown

    const dropdownBody = screen.getByTestId(`dropdown-body`)
    act(() => {
      fireEvent.mouseLeave(dropdownBody) // Simulate mouse leave
    })

    expect(onDropDownLeave).toHaveBeenCalled()
  })

  test(`Body do handle mouseEnter and mouseLeave`, () => {
    const { container } = render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} />)
    const inputElement = screen.getByTestId(`dropdown-body`)
    fireEvent.mouseEnter(inputElement) // Open dropdown
    fireEvent.mouseLeave(inputElement) // Open dropdown
    expect(container).toMatchSnapshot()
  })

  test(`Should toggle isOpen when input is clicked twice`, () => {
    const { container } = render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} />)
    const inputElement = screen.getByTestId(`dropdown_input`)
    fireEvent.click(inputElement)
    fireEvent.click(inputElement)
    expect(container).toMatchSnapshot()
  })

  test(`should render the default item renderer`, () => {
    const { container } = render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} />)
    const inputElement = screen.getByPlaceholderText(`Search`)
    fireEvent.click(inputElement)
    const inputElement2 = screen.getByText(items[0].label)
    fireEvent.mouseEnter(inputElement2)
    expect(container).toMatchSnapshot()
  })
})
