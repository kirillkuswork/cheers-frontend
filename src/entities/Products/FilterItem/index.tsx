import React, {
  FC, HTMLAttributes, useState, useEffect,
} from 'react';
import { Toggle } from '@/shareds';
import {
  IFilterItemProps,
  IFilterToggleItemProps,
} from '@/entities/Products/FilterItem/types';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { FilterItemHeader } from './FilterItemHeader';
import { FilterItemOptions } from './FilterItemOptions';

const Item: FC<IFilterItemProps> = ({
  title, children, filterTitleSubElement, initialIsOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const toggleOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.filterItem}>
      <FilterItemHeader
        isOpen={isOpen}
        element={filterTitleSubElement}
        toggleOpenHandler={toggleOpenHandler}
        title={title}
      />
      {isOpen && <FilterItemOptions>{children}</FilterItemOptions>}
    </div>
  );
};

const ToggleItem: FC<IFilterToggleItemProps> = ({
  title,
  isChecked,
  onChange,
  className,
}) => (
  <div className={clsx(styles.toggleItem, className)}>
    <span className={styles.title}>{title}</span>
    <Toggle isChecked={isChecked} onChange={onChange} />
  </div>
);

const Box: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => <div className={styles.filters}>{children}</div>;

export const Filter = {
  ToggleItem,
  Item,
  Box,
};
