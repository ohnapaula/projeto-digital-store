import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './index';

describe('ProductCard component', () => {
  it('renders single price when no discount is provided', () => {
    render(
      <MemoryRouter>
        <ProductCard
          name="K-Swiss V8"
          price={200}
          image="/product-thumb-1.jpeg"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('K-Swiss V8')).toBeInTheDocument();
    expect(screen.getByText(/200,00/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'K-Swiss V8' })).toHaveAttribute(
      'src',
      '/product-thumb-1.jpeg',
    );
  });

  it('renders original struck price and discount price when discount is provided', () => {
    render(
      <MemoryRouter>
        <ProductCard
          name="Nike Air Max"
          price={300}
          priceDiscount={199.9}
          imagem="/product-thumb-2.jpeg"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Nike Air Max')).toBeInTheDocument();
    expect(screen.getByText(/300,00/)).toBeInTheDocument();
    expect(screen.getByText(/199,90/)).toBeInTheDocument();
  });
});
