import { fireEvent, render, screen } from '@testing-library/react'

import { UnitSearchHeadContent } from './UnitSearchHeadContent'
import { UNIT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <UnitSearchHeadContent unitResults={UNIT_SEARCH_RESULT.unitResults} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestRouter router={{ push }}>
      <UnitSearchHeadContent unitResults={UNIT_SEARCH_RESULT.unitResults} />
    </TestRouter>,
  )
  const rows = screen.getAllByTestId(`project-search-head-row`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestRouter router={{ push }}>
      <UnitSearchHeadContent unitResults={UNIT_SEARCH_RESULT.unitResults} />
    </TestRouter>,
  )
  const rows = screen.getAllByTestId(`project-search-head-row-td`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(push).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
