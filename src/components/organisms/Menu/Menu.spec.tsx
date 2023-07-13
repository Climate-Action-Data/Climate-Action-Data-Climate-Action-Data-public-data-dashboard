import { render, screen } from '@testing-library/react'
import { Menu } from './Menu';
import userEvent from '@testing-library/user-event';

it('renders correctly', () => {
    const { container } = render(<Menu />)
    expect(container).toMatchSnapshot();
});