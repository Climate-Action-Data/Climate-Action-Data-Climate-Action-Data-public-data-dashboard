import { fireEvent, render, screen } from '@testing-library/react'

import { UnitSearchBodyContent } from './UnitSearchBodyContent'
import { UNIT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <UnitSearchBodyContent unitResults={UNIT_SEARCH_RESULT.unitResults} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with hover`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <UnitSearchBodyContent unitResults={UNIT_SEARCH_RESULT.unitResults} />
    </TestRouter>,
  )
  const rows = screen.getAllByTestId(`unit-table-row`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.mouseOver(rows[0])
  expect(container).toMatchSnapshot()
})
