import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer, { FooterInformation } from './index';

describe('Footer component', () => {
  it('renders footer information sections and copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText('Informação')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText(/Digital Store/i)).toBeInTheDocument();
  });

  it('renders dynamic items inside FooterInformation', () => {
    const items = [
      { text: 'Link 1', link: '/link1' },
      { text: 'Link 2', link: '/link2' },
    ];

    render(
      <MemoryRouter>
        <FooterInformation title="Links de Teste" informations={items} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Links de Teste')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Link 1' })).toHaveAttribute('href', '/link1');
    expect(screen.getByRole('link', { name: 'Link 2' })).toHaveAttribute('href', '/link2');
  });
});
