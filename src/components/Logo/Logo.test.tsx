import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from './index';

describe('Logo component', () => {
  it('renders default header logo', () => {
    render(<Logo />);
    const img = screen.getByRole('img', { name: 'Digital Store' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });

  it('renders white footer logo when white prop is true', () => {
    render(<Logo white alt="Digital Store Footer" />);
    const img = screen.getByRole('img', { name: 'Digital Store Footer' });
    expect(img).toBeInTheDocument();
  });
});
