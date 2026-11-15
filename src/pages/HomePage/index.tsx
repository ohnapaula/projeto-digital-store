import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../../components/Gallery';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import { homeBanners, featuredCollections, productsData } from '../../data/products';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const topProducts = productsData.slice(0, 8);

  return (
    <div className={styles.homePage} data-testid="home-page">
      <section className={styles.gallerySection} aria-label="Banners principais">
        <Gallery
          images={homeBanners}
          width={1440}
          height={681}
          radius="0px"
        />
      </section>

      <div className={styles.container}>
        <Section title="Coleções em destaque" titleAlign="center">
          <div className={styles.collectionsGrid}>
            {featuredCollections.map((col) => (
              <Link
                key={col.id}
                to={col.link}
                className={styles.collectionCard}
                aria-label={`${col.title} - ${col.discount}`}
              >
                <div className={styles.collectionContent}>
                  <span className={styles.collectionBadge}>{col.discount}</span>
                  <h3 className={styles.collectionTitle}>{col.title}</h3>
                  <button type="button" className={styles.collectionButton}>
                    Comprar
                  </button>
                </div>
                <div className={styles.collectionImageWrapper}>
                  <img
                    src={col.image}
                    alt={col.title}
                    className={styles.collectionImage}
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="Produtos em alta"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <ProductListing products={topProducts} columns={4} />
        </Section>
      </div>
    </div>
  );
};

export default HomePage;
