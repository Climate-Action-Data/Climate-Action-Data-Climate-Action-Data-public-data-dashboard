import { render } from '@testing-library/react'
import { HomeIcon } from '../HomeIcon';

it('renders correctly', () => {
    const { container } = render(<HomeIcon />)
    expect(container).toMatchSnapshot();
});