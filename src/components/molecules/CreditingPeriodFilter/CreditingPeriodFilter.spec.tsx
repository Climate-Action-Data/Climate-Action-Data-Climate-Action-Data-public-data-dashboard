import { render, screen } from '@testing-library/react'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import { DateFormats } from '@/@types/DateFormats'

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
    const tOnDateChange = jest.fn()
    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} onDateChange={tOnDateChange} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel))
    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected max date`, async () => {
    const tOnDateChange = jest.fn()

    const tLabel2 = `Up to ${format(tDate, DateFormats.YYYY_MM_DD)}`

    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} onDateChange={tOnDateChange} dateFilter={{ maxDate: tDate }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-apply`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected min date and click on clear`, async () => {
    const tOnDateChange = jest.fn()

    const tLabel2 = `${format(tDate, DateFormats.YYYY_MM_DD)} and later`

    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} onDateChange={tOnDateChange} dateFilter={{ minDate: tDate }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-clear`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter with a pre-selected min date and max date and click on apply`, async () => {
    const tOnDateChange = jest.fn()

    const tLabel2 = `${format(tDate, DateFormats.YYYY_MM_DD)} - ${format(tDate, DateFormats.YYYY_MM_DD)}`

    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} onDateChange={tOnDateChange} dateFilter={{ minDate: tDate, maxDate: tDate }} />
      </TestOvermindWrapper>,
    )

    await user.click(screen.getByText(tLabel2))
    await user.click(screen.getByTestId(`crediting-period-filter-apply`))

    expect(container).toMatchSnapshot()
  })

  test(`renders a CreditingPeriodFilter and open the date selectors and click on clear on the calendar`, async () => {
    const tOnDateChange = jest.fn()
    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter label={tLabel} onDateChange={tOnDateChange} />
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
