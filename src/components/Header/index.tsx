import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Logo from '../Logo';
import miniCartIcon from '../../../assets/mini-cart.svg';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (location.pathname.startsWith('/products') || location.pathname.startsWith('/produtos')) {
      setSearchTerm(filterParam || '');
    }
  }, [location.pathname, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/products?filter=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };

  const isProductsActive =
    location.pathname === '/products' ||
    location.pathname === '/produtos' ||
    location.pathname.startsWith('/product/');

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.logoArea}>
            <Link to="/" aria-label="Ir para a página inicial">
              <Logo />
            </Link>
          </div>

          <form
            className={styles.searchForm}
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Buscar produtos"
          >
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Pesquisar produto"
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Executar busca"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <div className={styles.actionsArea}>
            <Link to="/cadastro" className={styles.registerLink}>
              Cadastre-se
            </Link>
            <Link to="/login" className={styles.loginButton}>
              Entrar
            </Link>
            <div
              className={styles.cartWrapper}
              aria-label="Carrinho de compras (decorativo, 2 itens)"
              role="img"
            >
              <img src={miniCartIcon} alt="" className={styles.cartIcon} aria-hidden="true" />
              <span className={styles.cartBadge} aria-hidden="true">
                2
              </span>
            </div>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <nav
          className={styles.navRow}
          aria-label="Navegação principal"
        >
          <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.navListOpen : ''}`}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive || isProductsActive ? styles.navLinkActive : ''}`
                }
              >
                Produtos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Categorias
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/meus-pedidos"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                Meus Pedidos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
