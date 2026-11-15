import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductListing from './index';

describe('ProductListing component', () => {
  it('renders a list of products', () => {
    const mockProducts = [
      { id: 1, name: 'Produto 1', price: 100, image: '/p1.png' },
      { id: 2, name: 'Produto 2', price: 200, priceDiscount: 150, image: '/p2.png' },
    ];

    render(
      <MemoryRouter>
        <ProductListing products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('renders empty state when products array is empty', () => {
    render(
      <MemoryRouter>
        <ProductListing products={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
  });
});
