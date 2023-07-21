import { render } from '@testing-library/react'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'
import { describe } from 'node:test'

describe(`selectable chip`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<SelectableChip label={`label`} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly when isSelected`, () => {
    const { container } = render(<SelectableChip label={`label`} isSelected />)
    expect(container).toMatchSnapshot()
  })
})
