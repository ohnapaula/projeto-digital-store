import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductOptions from './index';

describe('ProductOptions component', () => {
  it('renders square text options and handles selection', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <ProductOptions
        title="Tamanho"
        options={['39', '40', '41']}
        shape="square"
        type="text"
        onChange={handleSelect}
      />,
    );

    expect(screen.getByText('Tamanho')).toBeInTheDocument();
    const option40 = screen.getByRole('radio', { name: 'Opção 40' });
    await user.click(option40);

    expect(handleSelect).toHaveBeenCalledWith('40');
    expect(option40).toHaveAttribute('aria-checked', 'true');
  });

  it('renders circle color options', () => {
    render(
      <ProductOptions
        title="Cor"
        options={['#6FEEFF', '#FF6969']}
        shape="circle"
        type="color"
      />,
    );

    expect(screen.getByRole('radio', { name: 'Cor #6FEEFF' })).toBeInTheDocument();
  });
});
