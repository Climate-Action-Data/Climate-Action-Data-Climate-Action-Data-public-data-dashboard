import { render } from '@testing-library/react'
import { MatchWordIcon } from './MatchWordIcon'

it(`renders correctly`, () => {
  const { container } = render(<MatchWordIcon />)
  expect(container).toMatchSnapshot()
})
