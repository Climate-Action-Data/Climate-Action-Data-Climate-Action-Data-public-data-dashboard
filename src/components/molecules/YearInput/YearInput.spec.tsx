import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import YearInput from '@/components/molecules/YearInput/YearInput'

describe(`YearInput`, () => {
  const tYear = 2023
  const tLabel = `YearInput`
  const user = userEvent.setup({ delay: null })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`renders a YearInput`, () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={tYear} onChange={tOnChange} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a YearInput with undefined value`, () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={undefined} onChange={tOnChange} />)

    expect(container).toMatchSnapshot()
  })

  test(`renders a YearInput and type in a correct value`, async () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={undefined} onChange={tOnChange} />)

    await user.type(screen.getByRole(`textbox`), `2023`)
    await user.tab()

    expect(tOnChange).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  test(`renders a YearInput and type in a wrong value`, async () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={undefined} onChange={tOnChange} />)

    await user.type(screen.getByRole(`textbox`), `wrong`)
    await user.tab()

    // eslint-disable-next-line no-magic-numbers
    expect(tOnChange).toHaveBeenCalledTimes(2)
    expect(container).toMatchSnapshot()
  })

  test(`renders a YearInput and type in a value earlier than minYear`, async () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={undefined} onChange={tOnChange} minYear={tYear} />)

    await user.type(screen.getByRole(`textbox`), `2022`)
    await user.tab()

    expect(container).toMatchSnapshot()
  })

  test(`renders a DateInput and type in a value later than maxDate`, async () => {
    const tOnChange = jest.fn()

    const { container } = render(<YearInput label={tLabel} value={undefined} onChange={tOnChange} maxYear={tYear} />)

    await user.type(screen.getByRole(`textbox`), `2024`)
    await user.tab()

    expect(container).toMatchSnapshot()
  })
})
