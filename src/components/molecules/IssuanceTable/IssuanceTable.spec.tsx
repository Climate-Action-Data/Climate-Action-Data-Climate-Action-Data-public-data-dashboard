import { fireEvent, render, screen } from '@testing-library/react'
import { IssuanceTable } from './IssuanceTable'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`RetirementDetails`, () => {
  const mockClick = jest.fn()

  it(`renders correctly issuances`, () => {
    const { container } = render(<IssuanceTable onClick={mockClick} issuances={PROJECT_DETAIL.issuances} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly issuances and row click`, () => {
    const { container } = render(<IssuanceTable onClick={mockClick} issuances={PROJECT_DETAIL.issuances} />)
    const rows = screen.getAllByTestId(`issuance-row`)
    expect(rows.length).toBeGreaterThan(0)
    fireEvent.click(rows[0])
    expect(mockClick).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<IssuanceTable onClick={mockClick} issuances={[]} />)
    expect(container).toMatchSnapshot()
  })
})
