import { render } from '@testing-library/react'
import CompareToggleButton, { CompareToggleButtonProps } from './CompareToggleButton'

const DEFAULT_PROPS: CompareToggleButtonProps = {
  isEnabled: true,
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<CompareToggleButton onClick={DEFAULT_PROPS.onClick} isEnabled={DEFAULT_PROPS.isEnabled} />)
  expect(container).toMatchSnapshot()
})
