import React, { FC } from 'react';
import { IQuizHeaderInfo } from '@/redux/services/types/quiz';
import styles from './styles.module.scss';

interface IProductsHeader extends IQuizHeaderInfo {}

export const ProductsHeader: FC<IProductsHeader> = ({ value, description }) => (
  <div className={styles.header}>
    <span className={styles.title}>{value}</span>
    {description && <span className={styles.description}>{description}</span>}
  </div>
);
