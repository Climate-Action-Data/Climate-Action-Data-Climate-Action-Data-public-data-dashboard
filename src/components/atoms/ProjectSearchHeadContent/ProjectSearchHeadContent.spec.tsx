import { fireEvent, render, screen } from '@testing-library/react'

import { ProjectSearchHeadContent } from './ProjectSearchHeadContent'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestRouter router={{ push }}>
      <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
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
      <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
    </TestRouter>,
  )
  const rows = screen.getAllByTestId(`project-search-head-row-td`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(push).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
