import { render } from '@testing-library/react'
import Home from './page';

it('renders correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot();
});