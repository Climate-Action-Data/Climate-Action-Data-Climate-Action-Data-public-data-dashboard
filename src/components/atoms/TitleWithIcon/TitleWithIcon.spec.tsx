import { render } from '@testing-library/react'
import { TitleWithIcon } from './TitleWithIcon'

const DEFAULT_TEST_TITLE = `My Title`

it(`renders correctly`, () => {
  const { container } = render(<TitleWithIcon title={DEFAULT_TEST_TITLE} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly without icon`, () => {
  const { container } = render(<TitleWithIcon hideIcon title={DEFAULT_TEST_TITLE} />)
  expect(container).toMatchSnapshot()
})
