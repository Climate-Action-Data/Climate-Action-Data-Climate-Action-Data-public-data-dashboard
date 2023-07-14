import { render } from '@testing-library/react'
import { CarbonReductionStandard } from './CarbonReductionStandard';
import React from 'react';

it('renders correctly', () => {
    const { container } = render(<CarbonReductionStandard vcs={30} gcc={20} eco={10} />)
    expect(container).toMatchSnapshot();
});