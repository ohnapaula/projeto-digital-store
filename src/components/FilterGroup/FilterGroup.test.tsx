import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterGroup from './index';

describe('FilterGroup component', () => {
  const options = [
    { text: 'Nike', value: 'nike' },
    { text: 'Adidas', value: 'adidas' },
  ];

  it('renders options with labels and inputs', () => {
    render(<FilterGroup title="Marca" inputType="checkbox" options={options} />);

    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByLabelText('Nike')).toBeInTheDocument();
    expect(screen.getByLabelText('Adidas')).toBeInTheDocument();
  });

  it('triggers onChange when option is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterGroup
        title="Marca"
        inputType="checkbox"
        options={options}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByLabelText('Nike'));
    expect(handleChange).toHaveBeenCalledWith('nike', true);
  });
});
