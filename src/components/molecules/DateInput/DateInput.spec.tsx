import { render, screen } from '@testing-library/react'
import DateInput from '@/components/molecules/DateInput/DateInput'
import userEvent from '@testing-library/user-event'

describe(`DateInput`, () => {
  const tYear = 2023
  const tMonth = 7
  const tDay = 1
  const tDate = new Date(tYear, tMonth, tDay)
  const tLabel = `DateInput`
  const user = userEvent.setup({ delay: null })

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(tDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`renders a DateInput`, () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={tDate} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput with undefined value`, () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and type in a correct value`, async () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} />)

    await user.type(screen.getByRole(`textbox`), `2023/01/08`)
    await user.tab()

    expect(tOnChange).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and type in a wrong value`, async () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} />)

    await user.type(screen.getByRole(`textbox`), `wrong`)
    await user.tab()

    expect(tOnChange).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and type in a value earlier than minDate`, async () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} minDate={tDate} />)

    await user.type(screen.getByRole(`textbox`), `2023/01/01`)
    await user.tab()

    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and type in a value later than maxDate`, async () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    const { container } = render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} maxDate={tDate} />)

    await user.type(screen.getByRole(`textbox`), `2024/01/01`)
    await user.tab()

    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and click on the Calendar icon`, async () => {
    const tOnChange = jest.fn()
    const toOpenDatePicker = jest.fn()

    render(<DateInput label={tLabel} value={undefined} onChange={tOnChange} onOpenDatePicker={toOpenDatePicker} maxDate={tDate} />)

    await user.click(screen.getByTestId(`datepicker-trigger`))

    expect(toOpenDatePicker).toHaveBeenCalledTimes(1)
  })
})
