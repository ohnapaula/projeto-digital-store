import React from 'react';
import logoHeader from '../../../assets/logo-header.svg';
import logoFooter from '../../../assets/logo-footer.svg';
import styles from './Logo.module.css';

export interface LogoProps {
  white?: boolean;
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  white = false,
  className = '',
  alt = 'Digital Store',
  width,
  height,
}) => {
  const src = white ? logoFooter : logoHeader;

  return (
    <span className={`${styles.logo} ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        style={{
          width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        }}
      />
    </span>
  );
};

export default Logo;
