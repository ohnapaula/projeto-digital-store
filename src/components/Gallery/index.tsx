import React, { useState } from 'react';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import arrowRightIcon from '../../../assets/arrow-right.svg';
import styles from './Gallery.module.css';

export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
  showThumbs?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  width,
  height,
  radius = '4px',
  className = '',
  showThumbs = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const resolvedWidth = width
    ? typeof width === 'number'
      ? `${width}px`
      : width
    : '100%';
  const resolvedHeight = height
    ? typeof height === 'number'
      ? `${height}px`
      : height
    : 'auto';

  return (
    <div
      className={`${styles.gallery} ${className}`.trim()}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Galeria de imagens"
      data-testid="gallery"
    >
      <div
        className={styles.mainStage}
        style={{
          maxWidth: resolvedWidth,
          height: resolvedHeight,
          borderRadius: radius,
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeftIcon} alt="" className={styles.arrowIcon} aria-hidden="true" />
        </button>

        <div
          className={styles.slidesTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              className={styles.slide}
              aria-hidden={idx !== currentIndex}
            >
              <img
                src={img.src}
                alt={img.alt || `Imagem ${idx + 1} de ${images.length}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isLast}
          className={`${styles.navButton} ${styles.navButtonRight}`}
          aria-label="Próxima imagem"
        >
          <img src={arrowRightIcon} alt="" className={styles.arrowIcon} aria-hidden="true" />
        </button>
      </div>

      {showThumbs && images.length > 1 && (
        <div className={styles.thumbsContainer} role="tablist" aria-label="Miniaturas da galeria">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`thumb-${img.src}-${idx}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ver imagem ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.thumbButton} ${isActive ? styles.thumbActive : ''}`}
                style={{ borderRadius: radius }}
              >
                <img
                  src={img.src}
                  alt=""
                  className={styles.thumbImage}
                  style={{ borderRadius: `calc(${radius} - 2px)` }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;
