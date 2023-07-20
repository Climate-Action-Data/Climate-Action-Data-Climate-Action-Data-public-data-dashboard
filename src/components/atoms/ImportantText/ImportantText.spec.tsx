import { render } from '@testing-library/react'
import { ImportantText } from './ImportantText'

it(`renders correctly`, () => {
  const { container } = render(<ImportantText>My Text</ImportantText>)
  expect(container).toMatchSnapshot()
})
