import { render, screen } from '@testing-library/react'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import userEvent from '@testing-library/user-event'
import VintageYearFilter from '@/components/molecules/VintageYearFilter/VintageYearFilter'

describe(`VintageYearFilter`, () => {
  const tYear = 2023
  const tLabel = `label`
  const user = userEvent.setup({ delay: null })

  test(`renders a VintageYearFilter and open it`, async () => {
    const tOnYearChange = jest.fn()
    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel))
    expect(screen.getByRole(`button`, { expanded: true })).toBeTruthy()
  })

  test(`renders a VintageYearFilter with a pre-selected max year and click on apply`, async () => {
    const tOnYearChange = jest.fn()

    const tLabel2 = `Up to ${tYear}`

    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} yearFilter={{ maxYear: tYear }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`vintage-year-filter-apply`))

    // await new Promise((r) => setTimeout(r, 5000))
    // expect(container).toMatchSnapshot()
  })

  test(`renders a VintageYearFilter with a pre-selected min year and click on apply`, async () => {
    const tOnYearChange = jest.fn()

    const tLabel2 = `${tYear} and later`

    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} yearFilter={{ minYear: tYear }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`vintage-year-filter-apply`))

    // await new Promise((r) => setTimeout(r, 5000))
    // expect(container).toMatchSnapshot()
  })

  test(`renders a VintageYearFilter with a pre-selected min year and click on clear`, async () => {
    const tOnYearChange = jest.fn()

    const tLabel2 = `${tYear} and later`

    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} yearFilter={{ minYear: tYear }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`vintage-year-filter-clear`))
    expect(tOnYearChange).toBeCalledTimes(1)
  })

  test(`renders a VintageYearFilter with a pre-selected min year and max year and click on apply`, async () => {
    const tOnYearChange = jest.fn()

    const tLabel2 = `${tYear} - ${tYear}`

    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} yearFilter={{ minYear: tYear, maxYear: tYear }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`vintage-year-filter-apply`))
  })

  test(`renders a VintageYearFilter and edit the min year and max year`, async () => {
    const tOnYearChange = jest.fn()

    render(
      <TestOvermindWrapper>
        <VintageYearFilter label={tLabel} onYearChange={tOnYearChange} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel))
    const tTextBoxes = screen.getAllByRole(`textbox`)
    await user.type(tTextBoxes[0], `2023`)
    await user.type(tTextBoxes[1], `2023`)
    await user.click(screen.getByTestId(`vintage-year-filter-apply`))
    expect(tOnYearChange).toBeCalledTimes(1)
  })
})
