import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Section from './index';

describe('Section component', () => {
  it('renders section title left-aligned by default with children', () => {
    render(
      <MemoryRouter>
        <Section title="Produtos em alta">
          <div data-testid="children">Filhos</div>
        </Section>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Produtos em alta' })).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders center-aligned title and optional link', () => {
    render(
      <MemoryRouter>
        <Section
          title="Coleções em destaque"
          titleAlign="center"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <div>Conteúdo</div>
        </Section>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Coleções em destaque' })).toBeInTheDocument();
  });
});
