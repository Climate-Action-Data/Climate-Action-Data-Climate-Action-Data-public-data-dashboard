import { render } from '@testing-library/react'
import { BookmarkIcon } from './BookmarkIcon';

it('renders correctly', () => {
    const { container } = render(<BookmarkIcon />)
    expect(container).toMatchSnapshot();
});