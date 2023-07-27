'use strict'

import { render } from '@testing-library/react'
import { SortUpIcon } from './SortUpIcon'

it(`renders correctly`, () => {
  const { container } = render(<SortUpIcon />)
  expect(container).toMatchSnapshot()
})
