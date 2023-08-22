import { render } from '@testing-library/react'
import CompareCloseButton from './CompareCloseButton'
import { CompareSubmitButtonProps } from '../CompareSubmitButton/CompareSubmitButton'

const DEFAULT_PROPS: CompareSubmitButtonProps = {
  isDisabled: true,
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<CompareCloseButton onClick={DEFAULT_PROPS.onClick} />)
  expect(container).toMatchSnapshot()
})
