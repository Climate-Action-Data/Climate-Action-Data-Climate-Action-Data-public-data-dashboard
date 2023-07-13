import { render } from '@testing-library/react'
import NoSSR from './noSSR';

it('renders correctly', () => {
    const { container } = render(<NoSSR><></></NoSSR>)
    expect(container).toMatchSnapshot();
});