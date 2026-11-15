import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import FilterGroup from '../../components/FilterGroup';
import { productsData, Product } from '../../data/products';
import styles from './ProductListingPage.module.css';

export const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filterQuery = (searchParams.get('filter') || '').toLowerCase().trim();

  const [sortOption, setSortOption] = useState<'default' | 'lowest' | 'highest'>('default');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const brandOptions = [
    { text: 'Adidas', value: 'Adidas' },
    { text: 'K-Swiss', value: 'K-Swiss' },
    { text: 'Nike', value: 'Nike' },
    { text: 'Puma', value: 'Puma' },
    { text: 'Beat Bass', value: 'Beat Bass' },
    { text: 'Drip', value: 'Drip' },
  ];

  const categoryOptions = [
    { text: 'Tênis', value: 'Tênis' },
    { text: 'Camisetas', value: 'Camisetas' },
    { text: 'Headphones', value: 'Headphones' },
  ];

  const genderOptions = [
    { text: 'Masculino', value: 'Masculino' },
    { text: 'Feminino', value: 'Feminino' },
    { text: 'Unissex', value: 'Unissex' },
  ];

  const conditionOptions = [
    { text: 'Novo', value: 'Novo' },
    { text: 'Usado', value: 'Usado' },
  ];

  const handleFilterToggle = (
    currentList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean,
  ) => {
    if (checked) {
      setter([...currentList, value]);
    } else {
      setter(currentList.filter((item) => item !== value));
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedConditions([]);
  };

  const getEffectivePrice = (p: Product) => p.priceDiscount ?? p.price;

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Search term check
        if (filterQuery) {
          const matchName = product.name.toLowerCase().includes(filterQuery);
          const matchCategory = product.category.toLowerCase().includes(filterQuery);
          const matchBrand = product.brand.toLowerCase().includes(filterQuery);
          if (!matchName && !matchCategory && !matchBrand) {
            return false;
          }
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
          return false;
        }

        // Gender filter
        if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
          return false;
        }

        // Condition filter
        if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'lowest') {
          return getEffectivePrice(a) - getEffectivePrice(b);
        }
        if (sortOption === 'highest') {
          return getEffectivePrice(b) - getEffectivePrice(a);
        }
        return 0;
      });
  }, [filterQuery, selectedBrands, selectedCategories, selectedGenders, selectedConditions, sortOption]);

  const resultsTitle = filterQuery
    ? `Resultados para "${filterQuery}" - ${filteredProducts.length} ${
        filteredProducts.length === 1 ? 'produto' : 'produtos'
      }`
    : `Resultados - ${filteredProducts.length} ${
        filteredProducts.length === 1 ? 'produto' : 'produtos'
      }`;

  return (
    <div className={styles.page} data-testid="product-listing-page">
      <button
        type="button"
        className={styles.mobileFilterToggle}
        onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
        aria-label="Alternar filtros de produtos"
      >
        <span>⚙</span>
        <span>{isMobileFiltersOpen ? 'Fechar filtros' : 'Filtrar e ordenar produtos'}</span>
      </button>

      <div className={styles.layout}>
        <aside
          className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.sidebarOpen : ''}`}
          aria-label="Filtros e ordenação"
        >
          <div className={styles.sortBox}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Ordenar por:
            </label>
            <select
              id="sort-select"
              className={styles.sortSelect}
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as 'default' | 'lowest' | 'highest')
              }
              aria-label="Ordenar produtos por preço"
            >
              <option value="default">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <h2 className={styles.filterTitle}>Filtrar por</h2>
              {(selectedBrands.length > 0 ||
                selectedCategories.length > 0 ||
                selectedGenders.length > 0 ||
                selectedConditions.length > 0) && (
                <button
                  type="button"
                  className={styles.clearFiltersButton}
                  onClick={clearAllFilters}
                >
                  Limpar
                </button>
              )}
            </div>
            <hr className={styles.divider} />

            <FilterGroup
              title="Marca"
              inputType="checkbox"
              options={brandOptions}
              selectedValues={selectedBrands}
              onChange={(val, checked) =>
                handleFilterToggle(selectedBrands, setSelectedBrands, val, checked)
              }
            />

            <FilterGroup
              title="Categoria"
              inputType="checkbox"
              options={categoryOptions}
              selectedValues={selectedCategories}
              onChange={(val, checked) =>
                handleFilterToggle(selectedCategories, setSelectedCategories, val, checked)
              }
            />

            <FilterGroup
              title="Gênero"
              inputType="checkbox"
              options={genderOptions}
              selectedValues={selectedGenders}
              onChange={(val, checked) =>
                handleFilterToggle(selectedGenders, setSelectedGenders, val, checked)
              }
            />

            <FilterGroup
              title="Estado"
              inputType="radio"
              options={conditionOptions}
              selectedValues={selectedConditions}
              onChange={(val, checked) => {
                if (checked) {
                  setSelectedConditions([val]);
                } else {
                  setSelectedConditions([]);
                }
              }}
            />
          </div>
        </aside>

        <main className={styles.content}>
          <Section title={resultsTitle} titleAlign="left">
            <ProductListing products={filteredProducts} columns={3} />
          </Section>
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
