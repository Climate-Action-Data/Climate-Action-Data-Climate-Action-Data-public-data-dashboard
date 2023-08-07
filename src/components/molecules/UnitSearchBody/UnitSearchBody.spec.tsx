import { fireEvent, render, screen } from '@testing-library/react'
import { UnitSearchBody } from './UnitSearchBody'
import { PROJECT_SEARCH_RESULT } from '@/test/TestOvermindMockData'
import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

describe(`ProjectSearchBody`, () => {
  const push = jest.fn()
  it(`renders correctly with no projects`, () => {
    const { container } = render(
      <TestOvermindWrapper projectResult={undefined}>
        <TestRouter router={{ push }}>
          <UnitSearchBody renderType={ALLOWED_RENDER_TYPE.UNIT} />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with projects`, () => {
    const { container } = render(
      <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
        <TestRouter router={{ push }}>
          <UnitSearchBody renderType={ALLOWED_RENDER_TYPE.UNIT} />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly with projects and handles click`, () => {
    const { container } = render(
      <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
        <TestRouter router={{ push }}>
          <UnitSearchBody renderType={ALLOWED_RENDER_TYPE.UNIT} />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    const rows = screen.getAllByTestId(`table-row`)
    expect(rows.length).toBeGreaterThan(0)
    fireEvent.click(rows[0])
    expect(push).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})

describe(`ProjectSearchBody`, () => {
  const push = jest.fn()
  const realError = console.error

  beforeEach(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = realError
  })

  it(`renders correctly with projects and no render type`, () => {
    expect(() =>
      render(
        <TestOvermindWrapper projectResult={PROJECT_SEARCH_RESULT}>
          <TestRouter router={{ push }}>
            <UnitSearchBody renderType={undefined} />
          </TestRouter>
        </TestOvermindWrapper>,
      ),
    ).toThrow(`This page should only be rendered in PageProject and is currently rendered in undefined`)
  })
})
