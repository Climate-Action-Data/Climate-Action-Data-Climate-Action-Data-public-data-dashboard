import { render } from '@testing-library/react'
import CompareToggleButton, { CompareToggleButtonProps } from './CompareToggleButton'

const DEFAULT_PROPS: CompareToggleButtonProps = {
  isDisabled: true,
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<CompareToggleButton onClick={DEFAULT_PROPS.onClick} isDisabled={DEFAULT_PROPS.isDisabled} />)
  expect(container).toMatchSnapshot()
})
