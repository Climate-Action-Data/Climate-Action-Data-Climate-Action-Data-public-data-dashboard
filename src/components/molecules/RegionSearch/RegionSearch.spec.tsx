import { render } from '@testing-library/react'
// import { render, screen } from '@testing-library/react'
import { RegionSearch } from './RegionSearch'
// import userEvent from '@testing-library/user-event'
import { TestOvermindWrapper } from '@/components/atoms/TestOvermindWrapper/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <RegionSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

// it(`renders with click on region`, async () => {
//   const { container } = await render(
//     <Provider value={overmind}>
//       <RegionSearch />
//     </Provider>,
//   )
//   await userEvent.click(screen.getByTestId(`button-region-0`))
//   await expect(container).toMatchSnapshot()
// })
