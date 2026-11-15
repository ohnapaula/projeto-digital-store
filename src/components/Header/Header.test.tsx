import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './index';

describe('Header component', () => {
  it('renders navigation links, actions and decorative cart', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Produtos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Categorias' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Meus Pedidos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cadastre-se' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /carrinho de compras/i })).toBeInTheDocument();
  });

  it('allows user to type into search and submit', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText('Pesquisar produto...');
    await user.type(searchInput, 'tenis');
    expect(searchInput).toHaveValue('tenis');

    const searchButton = screen.getByRole('button', { name: 'Executar busca' });
    await user.click(searchButton);
  });
});
