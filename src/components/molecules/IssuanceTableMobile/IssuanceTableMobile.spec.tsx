import { render, screen, fireEvent } from '@testing-library/react'
import { IssuanceTableMobile } from './IssuanceTableMobile'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'

describe(`IssuanceTableMobile`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(<IssuanceTableMobile issuances={PROJECT_DETAIL.issuances} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<IssuanceTableMobile issuances={[]} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with empty array`, () => {
    const { container } = render(<IssuanceTableMobile issuances={PROJECT_DETAIL.issuances} />)
    const items = screen.getAllByTestId(`issuance-mobile-item-click`)
    expect(items.length).toBeGreaterThan(0)
    fireEvent.click(items[0])
    expect(container).toMatchSnapshot()
  })
})
