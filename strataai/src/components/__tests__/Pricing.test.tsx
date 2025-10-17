import { render, screen } from '@testing-library/react';
import Pricing from '../Pricing';

describe('Pricing Component', () => {
  it('renders all three pricing tiers', () => {
    render(<Pricing />);

    expect(screen.getByText('Small Building')).toBeInTheDocument();
    expect(screen.getByText('Medium Building')).toBeInTheDocument();
    expect(screen.getByText('Large Building')).toBeInTheDocument();
  });

  it('displays correct pricing for each tier', () => {
    render(<Pricing />);

    expect(screen.getByText('$199')).toBeInTheDocument();
    expect(screen.getByText('$349')).toBeInTheDocument();
    expect(screen.getByText('$499')).toBeInTheDocument();
  });

  it('shows unit ranges for each tier', () => {
    render(<Pricing />);

    expect(screen.getByText(/< 20 units/i)).toBeInTheDocument();
    expect(screen.getByText(/20-100 units/i)).toBeInTheDocument();
    expect(screen.getByText(/100\+ units/i)).toBeInTheDocument();
  });

  it('lists included features', () => {
    render(<Pricing />);

    // Check for common features
    expect(screen.getAllByText(/State-compliant minutes/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/DOCX \+ PDF format/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/10-minute delivery/i)[0]).toBeInTheDocument();
  });

  it('includes link to B2B section', () => {
    render(<Pricing />);

    expect(screen.getByText(/Managing multiple properties/i)).toBeInTheDocument();
  });
});
