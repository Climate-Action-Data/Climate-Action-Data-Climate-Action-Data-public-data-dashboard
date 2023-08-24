import { render, screen, fireEvent } from '@testing-library/react'
import { DeletePopup } from './DeletePopup'

const DEFAULT_TEST_TITLE = `My Title`
const DEFAULT_TEST_CONTENT = `My Content`
const IS_OPEN = true
const IS_CLOSED = false
describe(`DeletePopup`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<DeletePopup isOpen={IS_OPEN} title={DEFAULT_TEST_TITLE} description={DEFAULT_TEST_CONTENT} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly when closed`, () => {
    const { container } = render(<DeletePopup isOpen={IS_CLOSED} title={DEFAULT_TEST_TITLE} description={DEFAULT_TEST_CONTENT} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly and closes from close button`, () => {
    const { container } = render(<DeletePopup isOpen={IS_OPEN} title={DEFAULT_TEST_TITLE} description={DEFAULT_TEST_CONTENT} />)
    const closeButton = screen.getByTestId(`close-delete-modal`)
    fireEvent.click(closeButton)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly and closes from cancel button`, () => {
    const cancelMock = jest.fn()
    const { container } = render(<DeletePopup isOpen={IS_OPEN} onCancel={cancelMock} title={DEFAULT_TEST_TITLE} description={DEFAULT_TEST_CONTENT} />)
    const cancelButton = screen.getByTestId(`cancel-delete-modal`)
    fireEvent.click(cancelButton)
    expect(container).toMatchSnapshot()
    expect(cancelMock).toHaveBeenCalled()
  })

  it(`renders correctly and closes from confirm button`, () => {
    const confirmMock = jest.fn()
    const { container } = render(<DeletePopup isOpen={IS_OPEN} onConfirm={confirmMock} title={DEFAULT_TEST_TITLE} description={DEFAULT_TEST_CONTENT} />)
    const cancelButton = screen.getByTestId(`confirm-delete-modal`)
    fireEvent.click(cancelButton)
    expect(container).toMatchSnapshot()
    expect(confirmMock).toHaveBeenCalled()
  })
})
