import { render } from '@testing-library/react'
import { RegionSearch } from './RegionSearch';

it('renders correctly', () => {
    const { container } = render(<RegionSearch />)
    expect(container).toMatchSnapshot();
});