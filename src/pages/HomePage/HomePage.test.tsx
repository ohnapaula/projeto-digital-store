import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './index';

describe('HomePage component', () => {
  it('renders hero gallery, featured collections and 8 trending products', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // Hero gallery
    expect(screen.getByTestId('gallery')).toBeInTheDocument();

    // Coleções em destaque
    expect(
      screen.getByRole('heading', { level: 2, name: 'Coleções em destaque' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Novo drop Supreme')).toBeInTheDocument();
    expect(screen.getByText('Coleção Adidas')).toBeInTheDocument();
    expect(screen.getByText('Novo Beat Bass')).toBeInTheDocument();

    // Produtos em alta
    expect(
      screen.getByRole('heading', { level: 2, name: 'Produtos em alta' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todos →' })).toHaveAttribute(
      'href',
      '/products',
    );

    // Exactly 8 products in trending section
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(8);
  });
});
