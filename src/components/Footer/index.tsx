import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import facebookIcon from '../../../assets/facebook.svg';
import instagramIcon from '../../../assets/instagram.svg';
import twitterIcon from '../../../assets/twitter.svg';
import styles from './Footer.module.css';

export interface FooterInfoItem {
  text: string;
  link?: string;
}

export interface FooterInformationProps {
  title: string;
  informations: FooterInfoItem[];
}

export const FooterInformation: React.FC<FooterInformationProps> = ({
  title,
  informations,
}) => {
  return (
    <div className={styles.infoCol}>
      <h3 className={styles.infoTitle}>{title}</h3>
      <ul className={styles.infoList}>
        {informations.map((item, index) => (
          <li key={`${item.text}-${index}`} className={styles.infoItem}>
            {item.link ? (
              item.link.startsWith('http') ? (
                <a
                  href={item.link}
                  className={styles.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                <Link to={item.link} className={styles.infoLink}>
                  {item.text}
                </Link>
              )
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const infoSection: FooterInfoItem[] = [
    { text: 'Sobre Drip Store', link: '/about' },
    { text: 'Segurança', link: '/seguranca' },
    { text: 'Wishlist', link: '/wishlist' },
    { text: 'Blog', link: '/blog' },
    { text: 'Trabalhe conosco', link: '/trabalhe-conosco' },
    { text: 'Meus Pedidos', link: '/meus-pedidos' },
  ];

  const categorySection: FooterInfoItem[] = [
    { text: 'Camisetas', link: '/products?filter=camiseta' },
    { text: 'Calças', link: '/products?filter=calca' },
    { text: 'Bonés', link: '/products?filter=bone' },
    { text: 'Headphones', link: '/products?filter=headphone' },
    { text: 'Tênis', link: '/products?filter=tenis' },
  ];

  const contactSection: FooterInfoItem[] = [
    { text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161' },
    { text: '(85) 3051-3411', link: 'tel:8530513411' },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link to="/" aria-label="Ir para a página inicial">
              <Logo white />
            </Link>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <div className={styles.socialList} aria-label="Redes sociais">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <img src={facebookIcon} alt="" className={styles.socialIcon} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <img src={instagramIcon} alt="" className={styles.socialIcon} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <img src={twitterIcon} alt="" className={styles.socialIcon} aria-hidden="true" />
              </a>
            </div>
          </div>

          <FooterInformation title="Informação" informations={infoSection} />
          <FooterInformation title="Categorias" informations={categorySection} />
          <FooterInformation title="Contato" informations={contactSection} />
        </div>

        <hr className={styles.divider} />
        <p className={styles.copyright}>© {currentYear} Digital Store</p>
      </div>
    </footer>
  );
};

export default Footer;
