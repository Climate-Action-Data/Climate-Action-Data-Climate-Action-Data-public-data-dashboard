import { fireEvent, render, screen } from '@testing-library/react'

import { ProjectSearchHeadContent } from './ProjectSearchHeadContent'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{ push }}>
        <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const rows = screen.getAllByTestId(`project-search-head-row`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click`, () => {
  const push = jest.fn()

  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{ push }}>
        <ProjectSearchHeadContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const rows = screen.getAllByTestId(`project-search-head-row-td`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.click(rows[0])
  expect(push).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})
