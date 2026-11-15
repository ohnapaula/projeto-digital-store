import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './index';

describe('Gallery component', () => {
  const images = [
    { src: '/slide1.jpeg', alt: 'Slide 1' },
    { src: '/slide2.jpeg', alt: 'Slide 2' },
    { src: '/slide3.jpeg', alt: 'Slide 3' },
  ];

  it('renders starting on first image and disables prev button', () => {
    render(<Gallery images={images} />);

    const prevButton = screen.getByRole('button', { name: 'Imagem anterior' });
    const nextButton = screen.getByRole('button', { name: 'Próxima imagem' });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('navigates next and disables next button on last slide', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);

    const nextButton = screen.getByRole('button', { name: 'Próxima imagem' });
    await user.click(nextButton);
    await user.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it('changes slide when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} showThumbs />);

    const thumbs = screen.getAllByRole('tab');
    expect(thumbs).toHaveLength(3);

    await user.click(thumbs[1]);
    expect(thumbs[1]).toHaveAttribute('aria-selected', 'true');
  });
});
