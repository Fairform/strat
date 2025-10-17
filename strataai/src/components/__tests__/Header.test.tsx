import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  it('renders the logo and navigation', () => {
    render(<Header />);

    // Check logo/brand name
    expect(screen.getByText('Strata AI')).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('For Businesses')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Header />);

    expect(screen.getByText('Upload Recording')).toBeInTheDocument();
    expect(screen.getByText('Get Demo')).toBeInTheDocument();
  });

  it('has proper aria labels for accessibility', () => {
    render(<Header />);

    const uploadButton = screen.getByRole('button', { name: /upload recording/i });
    expect(uploadButton).toBeInTheDocument();
  });

  it('applies sticky positioning', () => {
    const { container } = render(<Header />);
    const header = container.firstChild as HTMLElement;

    expect(header).toHaveClass('sticky');
  });
});
