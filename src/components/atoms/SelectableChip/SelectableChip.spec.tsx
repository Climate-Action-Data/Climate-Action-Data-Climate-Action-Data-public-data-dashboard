import { render, screen } from '@testing-library/react'
import SelectableChip from '@/components/atoms/SelectableChip/SelectableChip'
import userEvent from '@testing-library/user-event'

describe(`Selectable Chip`, () => {
  it(`renders correctly for unselected`, () => {
    const { container } = render(<SelectableChip label={`label`} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for selected`, () => {
    const { container } = render(<SelectableChip label={`label`} isSelected />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for selected`, async () => {
    const tOnClick = jest.fn()
    render(<SelectableChip label={`label`} isSelected onClick={tOnClick} />)
    await userEvent.click(screen.getByText(`label`))
    expect(tOnClick).toHaveBeenCalled()
  })
})
