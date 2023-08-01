import { render } from '@testing-library/react'
import { CardSection } from './CardSection'

const DEFAULT_TITLE = `My Title`
const DEFAULT_CONTENT = `My Content`
const DEFAULT_ICON_COLOR = `red`

it(`renders correctly`, () => {
  const { container } = render(
    <CardSection displaySectionTitle sectionTitle={{ title: DEFAULT_TITLE }}>
      {DEFAULT_CONTENT}
    </CardSection>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with colored icon`, () => {
  const { container } = render(
    <CardSection displaySectionTitle sectionTitle={{ title: DEFAULT_TITLE, iconColor: DEFAULT_ICON_COLOR }}>
      {DEFAULT_CONTENT}
    </CardSection>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with no icon`, () => {
  const { container } = render(
    <CardSection displaySectionTitle sectionTitle={{ title: DEFAULT_TITLE, hideIcon: true }}>
      {DEFAULT_CONTENT}
    </CardSection>,
  )
  expect(container).toMatchSnapshot()
})
