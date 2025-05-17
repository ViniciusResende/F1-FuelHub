/** Jest */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/** Components */
import NotFound from './NotFound';

/** Mocks */
const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('../../assets/svg/illustrations', () => ({
  CarRepairIllustration: (props: any) => (
    <svg data-testid='illustration' {...props} />
  ),
}));

/** Tests */

describe('NotFound page', () => {
  beforeEach(() => push.mockClear());

  it('renders correctly (snapshot)', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('redirects to home when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const button = screen.getByRole('button', { name: /back to home/i });
    await user.click(button);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/');
  });
});
