import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Section.module.css';

export interface SectionLink {
  text: string;
  href: string;
}

export interface SectionProps {
  title: string;
  titleAlign?: 'left' | 'center';
  link?: SectionLink;
  children?: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  titleAlign = 'left',
  link,
  children,
  className = '',
}) => {
  const isCenter = titleAlign === 'center';

  return (
    <section className={`${styles.section} ${className}`.trim()}>
      <div className={`${styles.header} ${isCenter ? styles.headerCenter : ''}`}>
        <h2
          className={`${styles.title} ${
            isCenter ? styles.titleCenter : styles.titleLeft
          }`}
        >
          {title}
        </h2>
        {link && !isCenter && (
          link.href.startsWith('http') ? (
            <a
              href={link.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text} →
            </a>
          ) : (
            <Link to={link.href} className={styles.link}>
              {link.text} →
            </Link>
          )
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Section;
