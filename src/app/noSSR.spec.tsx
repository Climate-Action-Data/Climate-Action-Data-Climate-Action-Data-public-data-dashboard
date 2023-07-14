import { render, act } from '@testing-library/react'
import NoSSR from './noSSR'

it(`renders correctly`, async () => {
  await act(async () => {
    const { container } = await render(
      <NoSSR>
        <></>
      </NoSSR>,
    )
    await expect(container).toMatchSnapshot()
  })
})
