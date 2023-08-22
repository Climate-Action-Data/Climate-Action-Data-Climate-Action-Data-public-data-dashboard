import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { AddWatchlistPopup } from './AddWatchlistPopup'
import { render, screen, fireEvent } from '@testing-library/react'

const PROJECT_ID = `eb21d827-5a9c-43a5-97ff-a9e37e01a72a`
const MODAL_OPEN = true
const MODAL_CLOSED = false
const DELAY_FOR_RENDER = 1000

it(`renders correctly with modal open`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with modal close`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_CLOSED} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and modal closes`, async () => {
  const mockModalClose = jest.fn()
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup onModalClose={mockModalClose} isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  const closeButton = screen.getByTestId(`close-add-watchlist-modal`)
  fireEvent.click(closeButton)
  expect(mockModalClose).toHaveBeenCalled()
  expect(container).toMatchSnapshot()
})

it(`renders correctly and searc input`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  fireEvent.input(screen.getByTestId(`search-add-watchlist-modal`), { target: { value: `Elec` } })
  const project = screen.getAllByTestId(`checkbox-watchlist`)
  expect(project.length).toBeGreaterThan(0)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and searc input then clear`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  fireEvent.input(screen.getByTestId(`search-add-watchlist-modal`), { target: { value: `Elec` } })
  fireEvent.input(screen.getByTestId(`search-add-watchlist-modal`), { target: { value: `` } })
  const project = screen.getAllByTestId(`checkbox-watchlist`)
  expect(project.length).toBeGreaterThan(0)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and search modal opens`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  const closeButton = screen.getByTestId(`search-add-create-modal`)
  fireEvent.click(closeButton)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and search modal opens and closes`, async () => {
  const { container } = render(
    <TestOvermindWrapper>
      <AddWatchlistPopup isOpen={MODAL_OPEN} warehouseProjectId={PROJECT_ID} />
    </TestOvermindWrapper>,
  )
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  const closeButton = screen.getByTestId(`search-add-create-modal`)
  fireEvent.click(closeButton)
  await new Promise((r) => setTimeout(r, DELAY_FOR_RENDER))
  fireEvent.click(screen.getByTestId(`cancel-modal`))
  expect(container).toMatchSnapshot()
})
