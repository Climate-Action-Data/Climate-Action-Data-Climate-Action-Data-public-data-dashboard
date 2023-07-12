import { render } from '@testing-library/react'
import { DarkModeSwitchIcon } from '../DarkModeSwitchIcon';

it('renders correctly', () => {
    const { container } = render(<DarkModeSwitchIcon />)
    expect(container).toMatchSnapshot();
});