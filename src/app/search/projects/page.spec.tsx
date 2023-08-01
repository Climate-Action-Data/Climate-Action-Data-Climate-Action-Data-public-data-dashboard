import { render, screen, fireEvent } from '@testing-library/react'
import Projects from './page'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <Projects />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
it(`renders correctly on table data`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <Projects />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly on table data and next page`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <Projects />
    </TestOvermindWrapper>,
  )

  const finalPage = screen.getByTestId(`pagination-last-page`)
  fireEvent.click(finalPage)

  expect(container).toMatchSnapshot()
})

it(`renders correctly on table data and scroll page`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <Projects />
    </TestOvermindWrapper>,
  )

  const scrollableContainer = screen.getByTestId(`table-scroll`)

  fireEvent.scroll(scrollableContainer, { target: { scrollBy: 600 } })

  expect(container).toMatchSnapshot()
})

it(`renders correctly and click next page`, () => {
  const { container } = render(
    <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
      <Projects />
    </TestOvermindWrapper>,
  )

  const inputElement = screen.getByTestId(`pagination-page-up`)
  fireEvent.click(inputElement)

  expect(container).toMatchSnapshot()
})
