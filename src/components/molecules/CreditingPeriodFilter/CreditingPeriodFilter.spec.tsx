import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'

describe(`CreditingPeriodFilter`, () => {
  test(`renders correctly`, () => {
    const tApplyFilter = jest.fn()
    const tLabel = `label`
    const { container } = render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter applyFilter={tApplyFilter} label={tLabel} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`buttons press test`, async () => {
    const tApplyFilter = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter applyFilter={tApplyFilter} label={tLabel} />
      </TestOvermindWrapper>,
    )
    await userEvent.click(screen.getByText(tLabel))
    expect(screen.queryByText(`Minimum Date`)).toBeInTheDocument()
    expect(screen.queryByText(`Maximum Date`)).toBeInTheDocument()
  })

  test(`onClose test`, async () => {
    const tApplyFilter = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter applyFilter={tApplyFilter} label={tLabel} />
      </TestOvermindWrapper>,
    )
    await userEvent.click(screen.getByText(tLabel))
    await userEvent.click(screen.getByText(tLabel))
    expect(screen.queryByText(`Minimum Date`)).not.toBeInTheDocument()
  })

  test(`renders correctly when clicked`, async () => {
    const tApplyFilter = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter applyFilter={tApplyFilter} label={tLabel} />
      </TestOvermindWrapper>,
    )
    await userEvent.click(screen.getByText(tLabel))
    await userEvent.click(screen.getByText(`Clear`))
    await userEvent.click(screen.getByText(`Apply`))
    expect(tApplyFilter).toBeCalled()
  })

  test(`set Max and Min Date`, async () => {
    const tApplyFilter = jest.fn()
    const tLabel = `label`
    render(
      <TestOvermindWrapper>
        <CreditingPeriodFilter applyFilter={tApplyFilter} label={tLabel} />
      </TestOvermindWrapper>,
    )
    await userEvent.click(screen.getByText(tLabel))
    await userEvent.click(screen.getAllByTestId(`date-picker`)[0])
    await userEvent.click(screen.getByText(`20`))
    await userEvent.click(screen.getAllByTestId(`date-picker`)[1])
    await userEvent.click(screen.getByText(`20`))
    // eslint-disable-next-line no-magic-numbers
    expect(screen.getAllByTestId(`clear-date`).length).toBe(2)
  })
})
