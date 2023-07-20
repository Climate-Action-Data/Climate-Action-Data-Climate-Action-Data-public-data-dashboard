import { render, act } from '@testing-library/react'
import NoSSR from './noSSR'
it(`renders correctly`, async () => {
  let container
  await act(async () => {
    const result = render(
      <NoSSR>
        <></>
      </NoSSR>,
    )
    container = result.container
  })
  expect(container).toMatchSnapshot()
})
