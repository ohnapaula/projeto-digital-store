import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App bootstrap', () => {
  it('renders initial application root', () => {
    render(<App />);
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
    expect(screen.getByText('Digital Store')).toBeInTheDocument();
  });
});
