import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductListingPage from './index';

describe('ProductListingPage component', () => {
  it('renders products, sort box and filter groups', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <ProductListingPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('product-listing-page')).toBeInTheDocument();
    expect(screen.getByLabelText(/Ordenar por:/i)).toBeInTheDocument();
    expect(screen.getByText('Filtrar por')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Gênero')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
  });

  it('filters products by URL query param', () => {
    render(
      <MemoryRouter initialEntries={['/products?filter=k-swiss']}>
        <ProductListingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Resultados para "k-swiss"/i)).toBeInTheDocument();
    expect(screen.getByText('K-Swiss V8 - Masculino')).toBeInTheDocument();
  });

  it('filters products interactively when brand is selected', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products']}>
        <ProductListingPage />
      </MemoryRouter>,
    );

    const adidasCheckbox = screen.getByLabelText('Adidas');
    await user.click(adidasCheckbox);

    expect(screen.getByText('Adidas Coreracer Casual')).toBeInTheDocument();
    expect(screen.queryByText('Nike Air Max Excee Masculino')).not.toBeInTheDocument();
  });

  it('sorts products by menor preço (effective price)', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/products']}>
        <ProductListingPage />
      </MemoryRouter>,
    );

    const sortSelect = screen.getByLabelText(/Ordenar produtos por preço/i);
    await user.selectOptions(sortSelect, 'lowest');

    const cards = screen.getAllByTestId('product-card');
    expect(cards.length).toBeGreaterThan(0);
    // Camiseta Dry Fit is R$ 69,90 discounted (lowest in list)
    expect(cards[0]).toHaveTextContent('Camiseta Dry Fit Performance');
  });

  it('works on /produtos route alias with search param', () => {
    render(
      <MemoryRouter initialEntries={['/produtos?filter=nike']}>
        <ProductListingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Resultados para "nike"/i)).toBeInTheDocument();
    expect(screen.getByText('Nike Air Max Excee Masculino')).toBeInTheDocument();
  });
});
