import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BuyBox from './index';

describe('BuyBox component', () => {
  it('renders product details and prices', () => {
    render(
      <BuyBox
        name="Tênis Nike Revolution 6 Next Nature Masculino"
        reference="38416711"
        stars={4.7}
        rating={90}
        price={219}
        priceDiscount={179.9}
        description="Descrição detalhada do produto"
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: /Tênis Nike Revolution 6/ })).toBeInTheDocument();
    expect(screen.getByText(/38416711/)).toBeInTheDocument();
    expect(screen.getByText('4.7')).toBeInTheDocument();
    expect(screen.getByText('(90 avaliações)')).toBeInTheDocument();
    expect(screen.getByText(/179,90/)).toBeInTheDocument();
    expect(screen.getByText(/219,00/)).toBeInTheDocument();
    expect(screen.getByText('Descrição detalhada do produto')).toBeInTheDocument();
  });

  it('triggers onBuy callback and shows demonstrative feedback', async () => {
    const user = userEvent.setup();
    const handleBuy = vi.fn();

    render(
      <BuyBox
        name="Produto Teste"
        reference="123"
        stars={5.0}
        rating="5 avaliações"
        price={100}
        description="Descrição"
        onBuy={handleBuy}
      />,
    );

    const buyButton = screen.getByRole('button', { name: 'Comprar produto' });
    await user.click(buyButton);

    expect(handleBuy).toHaveBeenCalled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
