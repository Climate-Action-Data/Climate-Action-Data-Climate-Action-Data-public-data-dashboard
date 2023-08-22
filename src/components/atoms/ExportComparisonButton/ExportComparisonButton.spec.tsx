import { render } from '@testing-library/react'
import ExportComparisonButton, { ExportComparisonButtonProps } from './ExportComparisonButton'

const DEFAULT_PROPS: ExportComparisonButtonProps = {
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<ExportComparisonButton onClick={DEFAULT_PROPS.onClick} />)
  expect(container).toMatchSnapshot()
})
