import { render } from '@testing-library/react'
import { DarkModeIcon } from './DarkModeIcon';

it('renders correctly', () => {
    const { container } = render(<DarkModeIcon />)
    expect(container).toMatchSnapshot();
});