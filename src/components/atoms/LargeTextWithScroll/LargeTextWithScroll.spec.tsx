import { render, fireEvent, screen } from '@testing-library/react'
import { LargeTextWithScroll, LargeTextWithScrollProps } from './LargeTextWithScroll'

const DEFAULT_PROPS: LargeTextWithScrollProps = {
  text: `My Text`,
  maxCharacter: 5,
  maxH: `100px`,
}

it(`renders correctly with text`, () => {
  const { text, maxCharacter, maxH } = DEFAULT_PROPS
  const { container } = render(<LargeTextWithScroll text={text} maxCharacter={maxCharacter} maxH={maxH} />)
  expect(container).toMatchSnapshot()
})

it(`renders correctly with text`, () => {
  const { text, maxCharacter, maxH } = DEFAULT_PROPS
  const { container } = render(<LargeTextWithScroll text={text} maxCharacter={maxCharacter} maxH={maxH} />)
  fireEvent.scroll(screen.getByTestId(`large-text-scroll`))
  expect(container).toMatchSnapshot()
})
