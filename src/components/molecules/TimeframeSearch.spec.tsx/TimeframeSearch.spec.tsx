import { render } from '@testing-library/react'
import { TimeframeSearch } from './TimeframeSearch';

it('renders correctly', () => {
    const { container } = render(<TimeframeSearch />)
    expect(container).toMatchSnapshot();
});