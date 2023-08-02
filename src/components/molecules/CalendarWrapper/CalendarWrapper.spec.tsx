import { fireEvent, render, screen } from '@testing-library/react'
import CalendarWrapper from '@/components/molecules/CalendarWrapper/CalendarWrapper'

describe(`CalendarWrapper`, () => {
  const tYear = 2023
  const tMonth = 7
  const tDay = 1
  const tDate = new Date(tYear, tMonth, tDay)

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(tDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`renders a CalendarWrapper`, () => {
    const tApplySelectedDate = jest.fn()

    const { container } = render(<CalendarWrapper applySelectedDate={tApplySelectedDate} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a CalendarWrapper with a maximum date`, () => {
    const tApplySelectedDate = jest.fn()

    const { container } = render(<CalendarWrapper applySelectedDate={tApplySelectedDate} preSelectedDate={tDate} maxDate={tDate} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a CalendarWrapper and select a date`, () => {
    const tApplySelectedDate = jest.fn()

    const { container } = render(<CalendarWrapper applySelectedDate={tApplySelectedDate} />)
    const tDay20 = screen.getByText(`20`)

    fireEvent.click(tDay20)
    expect(container).toMatchSnapshot()
  })

  test(`renders a CalendarWrapper with a preselectedDate`, () => {
    const tApplySelectedDate = jest.fn()

    const { container } = render(<CalendarWrapper applySelectedDate={tApplySelectedDate} preSelectedDate={tDate} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a CalendarWrapper and click on the actions`, async () => {
    const tApplySelectedDate = jest.fn()

    render(<CalendarWrapper applySelectedDate={tApplySelectedDate} preSelectedDate={tDate} />)

    const tClearButton = screen.getByTestId(`calender-wrapper-clear`)
    const tOKButton = screen.getByTestId(`calender-wrapper-ok`)

    fireEvent.click(tOKButton)
    expect(tApplySelectedDate).toBeCalledWith(tDate)
    fireEvent.click(tClearButton)
    expect(tApplySelectedDate).toBeCalledWith(undefined)
  })

  test(`renders a CalendarWrapper and click on the navigations`, () => {
    const tApplySelectedDate = jest.fn()

    const { container } = render(<CalendarWrapper applySelectedDate={tApplySelectedDate} preSelectedDate={tDate} />)

    const tPrevMonth = screen.getByLabelText(`before Aug`)
    const tNextMonth = screen.getByLabelText(`after Aug`)
    const tPrevYear = screen.getByLabelText(`before 2023`)
    const tNextYear = screen.getByLabelText(`after 2023`)

    fireEvent.click(tPrevMonth)
    fireEvent.click(tNextMonth)
    fireEvent.click(tPrevYear)
    fireEvent.click(tNextYear)

    expect(container).toMatchSnapshot()
  })
})
