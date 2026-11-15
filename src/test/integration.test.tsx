import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App';

describe('Storefront full integration and navigation regression', () => {
  it('navigates from home to search results via header search', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Pesquisar produto...');
    await user.type(searchInput, 'k-swiss');

    const searchButton = screen.getByRole('button', { name: 'Executar busca' });
    await user.click(searchButton);

    expect(screen.getByTestId('product-listing-page')).toBeInTheDocument();
    expect(screen.getByText(/Resultados para "k-swiss"/i)).toBeInTheDocument();
    expect(screen.getByText('K-Swiss V8 - Masculino')).toBeInTheDocument();
  });

  it('renders product detail page and triggers purchase demo flow', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('product-view-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /K-Swiss V8/ })).toBeInTheDocument();

    // Select size and color
    const sizeButton = screen.getByRole('radio', { name: 'Opção 41' });
    await user.click(sizeButton);
    expect(sizeButton).toHaveAttribute('aria-checked', 'true');

    // Click buy button
    const buyButton = screen.getByRole('button', { name: 'Comprar produto' });
    await user.click(buyButton);

    expect(
      screen.getByText(/Produto adicionado à sacola \(simulação\)/i),
    ).toBeInTheDocument();
  });

  it('handles /produtos alias seamlessly', () => {
    render(
      <MemoryRouter initialEntries={['/produtos?filter=adidas']}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('product-listing-page')).toBeInTheDocument();
    expect(screen.getByText(/Resultados para "adidas"/i)).toBeInTheDocument();
    expect(screen.getByText('Adidas Coreracer Casual')).toBeInTheDocument();
  });

  it('renders auxiliary demo pages with helpful fallback', () => {
    render(
      <MemoryRouter initialEntries={['/categorias']}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Categorias' })).toBeInTheDocument();
    expect(screen.getByText(/Explore todas as categorias/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar para a Home' })).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/rota-que-nao-existe']}>
        <AppContent />
      </MemoryRouter>,
    );

    expect(screen.getByText('Página não encontrada (404)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar para a Home' })).toBeInTheDocument();
  });
});
