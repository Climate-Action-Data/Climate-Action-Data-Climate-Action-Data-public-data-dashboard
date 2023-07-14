import { render } from '@testing-library/react'
import { CarbonReductionSector } from './CarbonReductionSector';
import React from 'react';

it('renders correctly', () => {
    const { container } = render(<CarbonReductionSector
        colorChart={["green.600", "green.700", "green.800", "green.900"]}
        data={[
            { label: "Renewable Energy", value: 40 },
            { label: "Waste Disposal", value: 24 },
            { label: "Energy Efficiency", value: 19 },
            { label: "Others", value: 17 }]}
    />)
    expect(container).toMatchSnapshot();
});