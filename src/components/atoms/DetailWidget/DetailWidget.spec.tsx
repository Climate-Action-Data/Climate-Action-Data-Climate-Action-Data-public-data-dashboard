import { render } from '@testing-library/react'
import { DetailWidget } from './DetailWidget'

const DEFAULT_TEST_TITLE = `My Title`
const DEFAULT_TEST_CONTENT = `My Content`

it(`renders correctly`, () => {
  const { container } = render(<DetailWidget title={DEFAULT_TEST_TITLE}>{DEFAULT_TEST_CONTENT}</DetailWidget>)
  expect(container).toMatchSnapshot()
})
