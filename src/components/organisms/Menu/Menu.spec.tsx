import { render } from '@testing-library/react'
import { Menu } from './Menu';

it('renders correctly', () => {
    const { container } = render(<Menu />)
    expect(container).toMatchSnapshot();
});