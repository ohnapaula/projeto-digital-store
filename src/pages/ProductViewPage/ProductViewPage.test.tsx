import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductViewPage from './index';

describe('ProductViewPage component', () => {
  it('renders product details, gallery, buy box and recommended products', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductViewPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('product-view-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /K-Swiss V8/ })).toBeInTheDocument();
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getByTestId('buy-box')).toBeInTheDocument();
    expect(screen.getByText('Tamanho')).toBeInTheDocument();
    expect(screen.getByText('Cor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Comprar produto' })).toBeInTheDocument();
    expect(screen.getByText('Produtos recomendados')).toBeInTheDocument();
  });

  it('renders not found state when product id does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/product/999']}>
        <Routes>
          <Route path="/product/:id" element={<ProductViewPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('product-not-found')).toBeInTheDocument();
    expect(screen.getByText('Produto não encontrado')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voltar para a listagem/i })).toHaveAttribute(
      'href',
      '/products',
    );
  });

  it('allows selecting different size and color options', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductViewPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const size42 = screen.getByRole('radio', { name: 'Opção 42' });
    await user.click(size42);
    expect(size42).toHaveAttribute('aria-checked', 'true');

    const colorButton = screen.getByRole('radio', { name: 'Cor #FF6969' });
    await user.click(colorButton);
    expect(colorButton).toHaveAttribute('aria-checked', 'true');
  });
});
