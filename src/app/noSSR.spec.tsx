import { render, act } from '@testing-library/react'
import NoSSR from './noSSR'

it(`renders correctly`, () => {
  act(() => {
    const { container } = render(
      <NoSSR>
        <></>
      </NoSSR>,
    )
    expect(container).toMatchSnapshot()
  })
})
