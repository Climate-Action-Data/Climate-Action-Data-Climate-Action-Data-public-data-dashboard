import { render, screen, fireEvent } from '@testing-library/react'
import { IssuanceTableMobileItem } from './IssuanceTableMobileItem'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'
import { Accordion } from '@chakra-ui/react'

describe(`IssuanceTableMobileItem`, () => {
  it(`renders correctly issuances`, () => {
    const { container } = render(
      <Accordion>
        <IssuanceTableMobileItem issuance={PROJECT_DETAIL.issuances[0]} />
      </Accordion>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly issuance and click header`, () => {
    const { container } = render(
      <Accordion>
        <IssuanceTableMobileItem issuance={PROJECT_DETAIL.issuances[0]} />
      </Accordion>,
    )
    const expandButton = screen.getByTestId(`expand-accordion`)
    fireEvent.click(expandButton)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly issuance and click header and more details`, () => {
    const push = jest.fn()
    const { container } = render(
      <TestRouter router={{ push }}>
        <Accordion>
          <IssuanceTableMobileItem issuance={PROJECT_DETAIL.issuances[0]} />
        </Accordion>
      </TestRouter>,
    )
    const expandButton = screen.getByTestId(`expand-accordion`)
    fireEvent.click(expandButton)
    const moreDetailsButton = screen.getByTestId(`expand-more-details`)
    fireEvent.click(moreDetailsButton)
    expect(push).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
