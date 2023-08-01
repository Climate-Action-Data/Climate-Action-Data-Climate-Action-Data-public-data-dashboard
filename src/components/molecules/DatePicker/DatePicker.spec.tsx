import { render, screen } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import DatePicker from '@/components/molecules/DatePicker/DatePicker'
import userEvent from '@testing-library/user-event'

describe(`DatePicker`, () => {
  test(`renders correctly`, () => {
    const tDate = new Date()
    const tOnChange = jest.fn()
    const tLabel = `label`
    const { container } = render(
      <TestOvermindWrapper>
        <DatePicker date={tDate} label={tLabel} onChange={tOnChange} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`Opens calender`, async () => {
    const tDate = new Date()
    const tOnChange = jest.fn()
    const tLabel = `label`
    const { container } = render(
      <TestOvermindWrapper>
        <DatePicker date={tDate} label={tLabel} onChange={tOnChange} />
      </TestOvermindWrapper>,
    )

    await userEvent.click(screen.getByTestId(`date-picker`))
    expect(container).toMatchSnapshot()
  })

  test(`clicks on date`, async () => {
    const tDate = new Date()
    const tOnChange = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <DatePicker date={tDate} label={tLabel} onChange={tOnChange} />
      </TestOvermindWrapper>,
    )

    await userEvent.click(screen.getByTestId(`date-picker`))
    await userEvent.click(screen.getByText(`20`))
    expect(tOnChange).toBeCalled()
  })

  test(`clicks on clear`, async () => {
    const tDate = new Date()
    const tOnChange = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <DatePicker date={tDate} label={tLabel} onChange={tOnChange} />
      </TestOvermindWrapper>,
    )

    await userEvent.click(screen.getByTestId(`clear-date`))
    expect(tOnChange).toBeCalledWith(undefined)
  })
})
