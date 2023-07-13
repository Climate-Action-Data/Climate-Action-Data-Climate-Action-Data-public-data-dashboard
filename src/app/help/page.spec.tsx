import { render } from '@testing-library/react'
import Page from './page';

it('renders correctly', () => {
    const { container } = render(<Page />)
    expect(container).toMatchSnapshot();
});