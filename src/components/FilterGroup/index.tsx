import React from 'react';
import styles from './FilterGroup.module.css';

export interface FilterOption {
  text: string;
  value?: string;
}

export interface FilterGroupProps {
  title: string;
  inputType: 'checkbox' | 'radio';
  options: FilterOption[];
  name?: string;
  selectedValues?: string[];
  onChange?: (value: string, checked: boolean) => void;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  inputType,
  options,
  name,
  selectedValues = [],
  onChange,
  className = '',
}) => {
  const groupName = name || title.toLowerCase().replace(/\s+/g, '-');

  const handleChange = (val: string, checked: boolean) => {
    if (onChange) {
      onChange(val, checked);
    }
  };

  return (
    <fieldset className={`${styles.group} ${className}`.trim()} data-testid="filter-group">
      <legend className={styles.title}>{title}</legend>
      <div className={styles.optionsList}>
        {options.map((option, index) => {
          const resolvedValue = option.value ?? option.text;
          const inputId = `${groupName}-${index}-${resolvedValue}`;
          const isChecked = selectedValues.includes(resolvedValue);

          return (
            <label key={inputId} htmlFor={inputId} className={styles.optionItem}>
              <input
                id={inputId}
                name={groupName}
                type={inputType}
                value={resolvedValue}
                checked={isChecked}
                onChange={(e) => handleChange(resolvedValue, e.target.checked)}
                className={styles.input}
              />
              <span className={styles.label}>{option.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default FilterGroup;
