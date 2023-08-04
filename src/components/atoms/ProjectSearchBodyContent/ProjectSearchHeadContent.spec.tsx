import { fireEvent, render, screen } from '@testing-library/react'

import { ProjectSearchBodyContent } from './ProjectSearchBodyContent'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { TestRouter } from '@/test/TestRouter'

it(`renders correctly`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <ProjectSearchBodyContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
    </TestRouter>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with hover`, () => {
  const { container } = render(
    <TestRouter router={{}}>
      <ProjectSearchBodyContent projectResults={PROJECT_SEARCH_RESULT.projectResults} />
    </TestRouter>,
  )
  const rows = screen.getAllByTestId(`table-row`)
  expect(rows.length).toBeGreaterThan(0)
  fireEvent.mouseOver(rows[0])
  expect(container).toMatchSnapshot()
})
