import { FC } from 'react';
import { MobileFilterControl } from '@/entities/Products/ProductsSorting/MobileFilterControl';
import { ProductsListFilter } from '@/entities/Products/ProductsSorting/ProductsListFilter';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { IProductsSortingProps } from './types';
import styles from './styles.module.scss';

export const ProductsSorting: FC<IProductsSortingProps> = ({
  handleOpenModal,
  selectedCategoriesCount,
  isLoading,
}) => {
  const { enumData, isEnumLoading } = useSelector(selectors.enumSelector);

  return (
    <div className={styles.productsSorting}>
      <MobileFilterControl
        isLoading={isLoading}
        selectedCategoriesCount={selectedCategoriesCount}
        handleOpenModal={handleOpenModal}
      />
      <ProductsListFilter enumData={enumData!} isLoading={isEnumLoading} />
    </div>
  );
};
