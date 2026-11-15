import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Gallery, { GalleryImage } from '../../components/Gallery';
import BuyBox from '../../components/BuyBox';
import ProductOptions from '../../components/ProductOptions';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import { productsData } from '../../data/products';
import styles from './ProductViewPage.module.css';

export const ProductViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const product = productsData.find((p) => p.id === numericId);

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0] || '',
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || '',
  );

  if (!product) {
    return (
      <div className={styles.notFoundContainer} data-testid="product-not-found">
        <h1 className={styles.notFoundTitle}>Produto não encontrado</h1>
        <p className={styles.notFoundText}>
          O produto que você procura não está disponível ou o link pode estar incorreto.
        </p>
        <Link to="/products" className={styles.backButton}>
          Voltar para a listagem de produtos
        </Link>
      </div>
    );
  }

  const galleryImages: GalleryImage[] =
    product.images && product.images.length > 0
      ? product.images.map((src, index) => ({
          src,
          alt: `${product.name} - imagem ${index + 1}`,
        }))
      : [{ src: product.image, alt: product.name }];

  const recommendedProducts = productsData
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.page} data-testid="product-view-page">
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/products" className={styles.breadcrumbLink}>
          Produtos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link
          to={`/products?filter=${encodeURIComponent(product.category.toLowerCase())}`}
          className={styles.breadcrumbLink}
        >
          {product.category}
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link
          to={`/products?filter=${encodeURIComponent(product.brand.toLowerCase())}`}
          className={styles.breadcrumbLink}
        >
          {product.brand}
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent} aria-current="page">
          {product.name}
        </span>
      </nav>

      <div className={styles.productOverview}>
        <div className={styles.galleryCol}>
          <Gallery
            images={galleryImages}
            width={700}
            height={570}
            radius="4px"
            showThumbs
          />
        </div>

        <div className={styles.infoCol}>
          <BuyBox
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
          >
            <div className={styles.optionsContainer}>
              <ProductOptions
                title="Tamanho"
                options={product.sizes}
                shape="square"
                radius="4px"
                type="text"
                value={selectedSize}
                onChange={setSelectedSize}
              />
              <ProductOptions
                title="Cor"
                options={product.colors}
                shape="circle"
                type="color"
                value={selectedColor}
                onChange={setSelectedColor}
              />
            </div>
          </BuyBox>
        </div>
      </div>

      <Section
        title="Produtos recomendados"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={recommendedProducts} columns={4} />
      </Section>
    </div>
  );
};

export default ProductViewPage;
