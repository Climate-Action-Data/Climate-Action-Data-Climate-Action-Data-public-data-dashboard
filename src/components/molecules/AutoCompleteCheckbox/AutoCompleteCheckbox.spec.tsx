import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'

describe(`AutoCompleteCheckbox`, () => {
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
    const { findByText } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={() => null} />)
    fireEvent.click(await findByText(tLabel))
    expect(findByText(tOptions[0])).toBeDefined()
    expect(findByText(tOptions[1])).toBeDefined()
  })

  test(`should render AutoCompleteCheckbox with options 3`, async () => {
    const { findByText } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={1} options={[`option1`]} selectedFilters={[`option1`]} applyFilters={() => null} />)

    expect(findByText(1)).toBeDefined()
  })

  test(`should be able to apply filter`, async () => {
    const tApplyFilters = jest.fn()
    const { findByText, findByRole } = render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={tApplyFilters} />)
    fireEvent.click(await findByText(tLabel))
    const tOption = await findByRole(`checkbox`, { name: `option1` })
    const tApply = await findByText(`Apply`)
    fireEvent.click(tOption)
    expect(tOption).toBeChecked()
    fireEvent.click(tOption)
    expect(tOption).not.toBeChecked()
    fireEvent.click(tOption)
    fireEvent.click(tApply)
    expect(tApplyFilters).toHaveBeenCalledWith([`option1`])
  })

  test(`should filter based on input`, async () => {
    const { findByPlaceholderText, findByText, queryByText } = render(
      <AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={() => null} />,
    )
    fireEvent.click(await findByText(tLabel))
    const tSearchField = await findByPlaceholderText(`Search`)
    fireEvent.change(tSearchField, { target: { value: `option2` } })
    const tOption_1 = queryByText(`option1`)
    expect(tOption_1).toBeNull()
  })

  test(`should trigger AutoCompleteCheckbox onClose`, async () => {
    render(<AutoCompleteCheckbox label={tLabel} noOfSelectedFilters={0} options={tOptions} selectedFilters={[]} applyFilters={() => null} />)
    await userEvent.click(await screen.findByText(tLabel))
    await userEvent.click(await screen.findByText(tLabel))
    await waitFor(() => expect(screen.queryByText(tOptions[0])).toBeDefined(), { timeout: 2 })
  })
})
