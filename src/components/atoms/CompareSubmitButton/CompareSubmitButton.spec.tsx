import { render } from '@testing-library/react'
import CompareSubmitButton, { CompareSubmitButtonProps } from './CompareSubmitButton'

const DEFAULT_PROPS: CompareSubmitButtonProps = {
  isDisabled: true,
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<CompareSubmitButton onClick={DEFAULT_PROPS.onClick} isDisabled={DEFAULT_PROPS.isDisabled} />)
  expect(container).toMatchSnapshot()
})
