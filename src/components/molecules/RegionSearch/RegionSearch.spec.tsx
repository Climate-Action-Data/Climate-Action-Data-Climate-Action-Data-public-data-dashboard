import { render, screen } from '@testing-library/react'
import { RegionSearch } from './RegionSearch'
import userEvent from '@testing-library/user-event'

it(`renders correctly`, () => {
  const { container } = render(<RegionSearch />)
  expect(container).toMatchSnapshot()
})

it(`renders with click on region`, async () => {
  const { container } = render(<RegionSearch />)
  await userEvent.click(screen.getByTestId(`button-region-0`))
  expect(container).toMatchSnapshot()
})

it(`renders with click on going back`, async () => {
  const { container } = render(<RegionSearch />)
  await userEvent.click(screen.getByTestId(`button-region-0`))
  await userEvent.click(screen.getByTestId(`button-region-back`))
  expect(container).toMatchSnapshot()
})
