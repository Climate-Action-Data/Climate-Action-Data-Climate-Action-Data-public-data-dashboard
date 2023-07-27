import { fireEvent, render } from '@testing-library/react'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'

describe(`AutoComplete`, () => {
  const tLabel = `search`
  const tOptions = [`option1`, `option2`, `option3`]

  test(`should render AutoCompleteCheckbox with no data input`, () => {
    const { container } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={[]} selectedFilters={[]} applyFilters={() => null} />)
    expect(container).toMatchSnapshot()
  })

  test(`should render AutoCompleteCheckbox with options`, () => {
    const { container } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={() => null} />)
    expect(container).toMatchSnapshot()
  })

  test(`should render AutoCompleteCheckbox with options 2`, async () => {
    const { container, findByText } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={() => null} />)
    fireEvent.click(await findByText(tLabel))
    expect(container).toMatchSnapshot()
  })

  // test(`should call onDropDownLeave when mouse leaves the dropdown`, () => {
  //   const onDropDownLeave = jest.fn()
  //   render(<AutoComplete items={items} placeholder="Search" onItemClick={() => undefined} onDropDownLeave={onDropDownLeave} />)
  //
  //   const inputElement = screen.getByPlaceholderText(`Search`)
  //   fireEvent.click(inputElement) // Open dropdown
  //
  //   const dropdownBody = screen.getByTestId(`dropdown-body`)
  //   act(() => {
  //     fireEvent.mouseLeave(dropdownBody) // Simulate mouse leave
  //   })
  //
  //   expect(onDropDownLeave).toHaveBeenCalled()
  // })
})
