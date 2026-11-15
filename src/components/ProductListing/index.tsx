import React from 'react';
import ProductCard, { ProductCardProps } from '../ProductCard';
import styles from './ProductListing.module.css';

export interface ProductListingProps {
  products: ProductCardProps[];
  columns?: 3 | 4;
  className?: string;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  columns = 4,
  className = '',
}) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyTitle}>Nenhum produto encontrado</h3>
        <p className={styles.emptyDescription}>
          Tente ajustar seus termos de busca ou remover alguns filtros aplicados.
        </p>
      </div>
    );
  }

  const columnClass = columns === 3 ? styles.columns3 : styles.columns4;

  return (
    <div
      className={`${styles.grid} ${columnClass} ${className}`.trim()}
      data-testid="product-listing"
    >
      {products.map((product, index) => {
        const key = product.id ?? `${product.name}-${index}`;
        return <ProductCard key={key} {...product} />;
      })}
    </div>
  );
};

export default ProductListing;
