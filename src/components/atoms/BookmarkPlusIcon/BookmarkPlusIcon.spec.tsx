import { render } from '@testing-library/react'
import { BookmarkPlusIcon } from './BookmarkPlusIcon'

it(`renders correctly`, () => {
  const { container } = render(<BookmarkPlusIcon />)
  expect(container).toMatchSnapshot()
})
