import { render } from '@testing-library/react'
import { ImportantText } from './ImportantText'

test(`renders correctly`, () => {
  const { container } = render(<ImportantText>My Text</ImportantText>)
  expect(container).toMatchSnapshot()
})

test(`renders correctly as p`, () => {
  const { container } = render(<ImportantText as="p">My Text</ImportantText>)
  expect(container).toMatchSnapshot()
})

test(`renders correctly as numbers`, () => {
  const { container } = render(<ImportantText isNumeric={true}>100</ImportantText>)
  expect(container).toMatchSnapshot()
})
