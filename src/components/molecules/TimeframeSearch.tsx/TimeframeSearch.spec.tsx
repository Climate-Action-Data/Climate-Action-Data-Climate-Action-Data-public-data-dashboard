import { render, screen } from '@testing-library/react'
import { TimeframeSearch } from './TimeframeSearch';
import userEvent from '@testing-library/user-event';

it('renders correctly', () => {
    const { container } = render(<TimeframeSearch />)
    expect(container).toMatchSnapshot();
});


it('renders with click on timeframe', async () => {
    const { container } = await render(<TimeframeSearch />)
    await userEvent.click(screen.getByTestId("button-timeframe-0"))
    await expect(container).toMatchSnapshot();
});

it('renders with click on going back', async () => {
    const { container } = await render(<TimeframeSearch />)
    await userEvent.click(screen.getByTestId("button-timeframe-0"))
    await userEvent.click(screen.getByTestId("button-timeframe-close"))
    await expect(container).toMatchSnapshot();
});