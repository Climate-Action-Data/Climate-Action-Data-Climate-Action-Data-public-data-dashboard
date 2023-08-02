import { render, screen } from '@testing-library/react'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import userEvent from '@testing-library/user-event'
import { MockData } from '@/test/TestOvermindMockData'
import { format } from 'date-fns'

describe(`CreditingPeriodFilter`, () => {
  const tYear = 2023
  const tMonth = 7
  const tDay = 1
  const tDate = new Date(tYear, tMonth, tDay)
  const tLabel = `label`
  const user = userEvent.setup({ delay: null })

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(tDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`renders a CreditingPeriodFilter and open it`, async () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel))
    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected max date`, async () => {
    const mockData = MockData.SEARCH_FILTER_VALUES
    mockData.selectedSearchFilterValues.searchFilterValues.filterDates = { maxDate: tDate }

    const tLabel2 = `Up to ${format(tDate, `dd/MM/yyyy`)}`

    const { container } = render(
      <TestOvermindWrapper searchFilters={mockData}>
        <CreditingPeriodFilter label={tLabel} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-apply`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected min date and click on clear`, async () => {
    const mockData = MockData.SEARCH_FILTER_VALUES
    mockData.selectedSearchFilterValues.searchFilterValues.filterDates = { minDate: tDate }

    const tLabel2 = `${format(tDate, `dd/MM/yyyy`)} and later`

    const { container } = render(
      <TestOvermindWrapper searchFilters={mockData}>
        <CreditingPeriodFilter label={tLabel} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-clear`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected min date and max date and click on apply`, async () => {
    const mockData = MockData.SEARCH_FILTER_VALUES
    mockData.selectedSearchFilterValues.searchFilterValues.filterDates = { minDate: tDate, maxDate: tDate }

    const tLabel2 = `${format(tDate, `dd/MM/yyyy`)} - ${format(tDate, `dd/MM/yyyy`)}`

    const { container } = render(
      <TestOvermindWrapper searchFilters={mockData}>
        <CreditingPeriodFilter label={tLabel} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-apply`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter and open the date selectors and click on clear on the calendar`, async () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} />
      </TestOvermindWrapper>,
    )

    const tRenderedLabel = screen.getByText(tLabel)

    await user.click(tRenderedLabel)

    const tDateSelectors = screen.getAllByTestId(`datepicker-trigger`)

    // eslint-disable-next-line no-magic-numbers
    expect(tDateSelectors.length).toBe(2)

    await user.click(tDateSelectors[0])
    await user.type(tDateSelectors[0], `{esc}`)
    await user.click(tRenderedLabel)

    const tDateSelectors2 = screen.getAllByTestId(`datepicker-trigger`)

    await user.click(tDateSelectors2[1])
    await user.click(screen.getByTestId(`calender-wrapper-clear`))

    expect(container).toMatchSnapshot()
  })
})
