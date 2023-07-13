import { render } from '@testing-library/react'
import { DarkModeSwitch } from './DarkModeSwitch';

it('renders correctly', () => {
    const { container } = render(<DarkModeSwitch />)
    expect(container).toMatchSnapshot();
});