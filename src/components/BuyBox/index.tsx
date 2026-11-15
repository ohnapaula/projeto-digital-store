import React, { useState } from 'react';
import starIcon from '../../../assets/star-icon.svg';
import { formatCurrency } from '../../utils/format';
import styles from './BuyBox.module.css';

export interface BuyBoxProps {
  name: string;
  reference: string;
  stars: number;
  rating: number | string;
  price: number;
  priceDiscount?: number;
  description: string;
  children?: React.ReactNode;
  onBuy?: () => void;
  className?: string;
}

export const BuyBox: React.FC<BuyBoxProps> = ({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
  className = '',
}) => {
  const [demoFeedback, setDemoFeedback] = useState(false);

  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;
  const ratingText = typeof rating === 'number' ? `(${rating} avaliações)` : rating;

  const handleBuyClick = () => {
    setDemoFeedback(true);
    if (onBuy) {
      onBuy();
    }
  };

  return (
    <div className={`${styles.buyBox} ${className}`.trim()} data-testid="buy-box">
      <div className={styles.titleArea}>
        <h1 className={styles.name}>{name}</h1>
        <span className={styles.reference}>Casual | {reference}</span>
      </div>

      <div className={styles.ratingRow}>
        <div className={styles.starsBadge} aria-label={`${stars} de 5 estrelas`}>
          <span>{stars.toFixed(1)}</span>
          <img src={starIcon} alt="" className={styles.starIcon} aria-hidden="true" />
        </div>
        <span className={styles.ratingCount}>{ratingText}</span>
      </div>

      <div className={styles.priceRow}>
        {hasDiscount ? (
          <>
            <span className={styles.priceDiscount}>
              {formatCurrency(priceDiscount)}
            </span>
            <span className={styles.priceOriginalStrikethrough}>
              {formatCurrency(price)}
            </span>
          </>
        ) : (
          <span className={styles.priceSingle}>{formatCurrency(price)}</span>
        )}
      </div>

      <div className={styles.descriptionSection}>
        <span className={styles.descriptionLabel}>Descrição do produto</span>
        <p className={styles.description}>{description}</p>
      </div>

      {children && <div className={styles.childrenArea}>{children}</div>}

      <button
        type="button"
        className={styles.buyButton}
        onClick={handleBuyClick}
        aria-label="Comprar produto"
      >
        COMPRAR
      </button>

      {demoFeedback && (
        <div className={styles.demoToast} role="status">
          <span>✓ Feedback demonstrativo: Produto adicionado à sacola (simulação).</span>
          <button
            type="button"
            onClick={() => setDemoFeedback(false)}
            style={{ marginLeft: '12px', fontWeight: 'bold' }}
            aria-label="Fechar mensagem de demonstração"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyBox;
