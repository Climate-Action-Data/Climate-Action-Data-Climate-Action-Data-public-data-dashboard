import { render, screen } from '@testing-library/react'
import { RegionSearch } from './RegionSearch';
import userEvent from "@testing-library/user-event"
import React from 'react';

it('renders correctly', () => {
    const { container } = render(<RegionSearch />)
    expect(container).toMatchSnapshot();
});

it('renders with click on region', async () => {
    const { container } = await render(<RegionSearch />)
    await userEvent.click(screen.getByTestId("button-region-0"))
    await expect(container).toMatchSnapshot();
});

it('renders with click on going back', async () => {
    const { container } = await render(<RegionSearch />)
    await userEvent.click(screen.getByTestId("button-region-0"))
    await userEvent.click(screen.getByTestId("button-region-back"))
    await expect(container).toMatchSnapshot();
});