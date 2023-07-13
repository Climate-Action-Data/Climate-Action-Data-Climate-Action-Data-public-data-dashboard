import { render } from '@testing-library/react'
import { LightModeSwitchIcon } from './LightModeSwitchIcon';

it('renders correctly', () => {
    const { container } = render(<LightModeSwitchIcon />)
    expect(container).toMatchSnapshot();
});