import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id?: string | number;
  image?: string;
  imagem?: string;
  name: string;
  price: number;
  priceDiscount?: number;
  category?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  imagem,
  name,
  price,
  priceDiscount,
  category = 'Tênis',
  className = '',
}) => {
  const imageSrc = image || imagem || '';
  const resolvedId = id ?? 1;
  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - priceDiscount) / price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${resolvedId}`}
      className={`${styles.card} ${className}`.trim()}
      data-testid="product-card"
    >
      <div className={styles.imageWrapper}>
        {hasDiscount && (
          <span className={styles.discountBadge}>{discountPercent}% OFF</span>
        )}
        <img
          src={imageSrc}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <>
              <span className={styles.originalPriceStrikethrough}>
                {formatCurrency(price)}
              </span>
              <span className={styles.discountPrice}>
                {formatCurrency(priceDiscount)}
              </span>
            </>
          ) : (
            <span className={styles.originalPrice}>{formatCurrency(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
