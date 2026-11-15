import React, { useState } from 'react';
import styles from './ProductOptions.module.css';

export interface ProductOptionsProps {
  title?: string;
  options: string[];
  radius?: string;
  shape: 'square' | 'circle';
  type: 'text' | 'color';
  defaultValue?: string;
  value?: string;
  onChange?: (selected: string) => void;
  className?: string;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  title,
  options,
  radius = '4px',
  shape,
  type,
  defaultValue,
  value,
  onChange,
  className = '',
}) => {
  const [internalSelected, setInternalSelected] = useState<string>(
    defaultValue || options[0] || '',
  );

  const selectedOption = value !== undefined ? value : internalSelected;

  const handleSelect = (option: string) => {
    if (value === undefined) {
      setInternalSelected(option);
    }
    if (onChange) {
      onChange(option);
    }
  };

  const isSquare = shape === 'square';
  const isCircle = shape === 'circle';
  const isColor = type === 'color';
  const isText = type === 'text';

  return (
    <div className={`${styles.container} ${className}`.trim()} data-testid="product-options">
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.optionsList} role="radiogroup" aria-label={title || 'Opções do produto'}>
        {options.map((option) => {
          const isSelected = selectedOption === option;

          const buttonStyle: React.CSSProperties = {
            borderRadius: isSquare ? radius : undefined,
            backgroundColor: isColor ? option : undefined,
          };

          const shapeClass = isSquare ? styles.square : isCircle ? styles.circle : '';
          const typeClass = isText ? styles.textType : isColor ? styles.colorType : '';
          const selectedClass = isSelected ? styles.selected : '';

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={isColor ? `Cor ${option}` : `Opção ${option}`}
              className={`${styles.optionButton} ${shapeClass} ${typeClass} ${selectedClass}`}
              style={buttonStyle}
              onClick={() => handleSelect(option)}
            >
              {isText && option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
