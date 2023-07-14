import { render, screen } from '@testing-library/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import userEvent from '@testing-library/user-event'

it(`renders correctly`, () => {
  const { container } = render(<DarkModeSwitch />)
  expect(container).toMatchSnapshot()
})

it(`renders with click on dark mode`, async () => {
  const { container } = await render(<DarkModeSwitch />)
  await userEvent.click(screen.getByTestId(`button-darkmode`))
  await expect(container).toMatchSnapshot()
})

it(`renders with click on dark mode twice`, async () => {
  const { container } = await render(<DarkModeSwitch />)
  await userEvent.click(screen.getByTestId(`button-darkmode`))
  await userEvent.click(screen.getByTestId(`button-darkmode`))
  await expect(container).toMatchSnapshot()
})
