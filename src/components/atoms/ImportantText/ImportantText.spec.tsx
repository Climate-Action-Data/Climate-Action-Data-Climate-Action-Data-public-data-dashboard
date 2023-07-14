import { render } from '@testing-library/react'
import { ImportantText } from './ImportantText';
import React from 'react';

it('renders correctly', () => {
    const { container } = render(<ImportantText>My Text</ImportantText>)
    expect(container).toMatchSnapshot();
});