'use strict'

import { render } from '@testing-library/react'
import { KebabMenuIcon } from './KebabMenuIcon'

it(`renders correctly`, () => {
  const { container } = render(<KebabMenuIcon />)
  expect(container).toMatchSnapshot()
})
