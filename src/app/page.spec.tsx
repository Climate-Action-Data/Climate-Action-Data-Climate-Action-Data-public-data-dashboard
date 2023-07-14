import { render } from '@testing-library/react'
import Home from './page';
import { createOvermindMock } from 'overmind'
import { config } from './../overmind'

it('renders correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot();
});