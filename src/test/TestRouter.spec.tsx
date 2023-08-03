import { fireEvent, render, screen } from '@testing-library/react'
import { TestRouter } from './TestRouter'

it(`renders correctly`, () => {
  const push = jest.fn()
  const { container } = render(
    <TestRouter router={{ push }}>
      <button onClick={() => push(`/`)}>Click Me</button>
    </TestRouter>,
  )
  const submitButton = screen.getByRole(`button`)
  fireEvent.click(submitButton)
  expect(push).toHaveBeenCalledWith(`/`)
  expect(container).toMatchSnapshot()
})
