import { ProductsSorting, ProductsTags } from '@/entities/Products';
import { ProductsList } from '@/features/Products';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { ProductsHeader } from '@/entities/Products/ProductsHeader';
import styles from './styles.module.scss';
import { IProductsContainerProps } from './types';

export const ProductsContainer: FC<IProductsContainerProps> = ({
  handleOpenModal,
  products,
  selectedCategoriesCount,
  hasMore,
  loadMoreProducts,
  isLoading,
}) => {
  const { quizHeaderInfo } = useSelector(selectors.productsSelectors);
  const isButton = useMemo(
    () => !!products.length && hasMore && !isLoading,
    [products.length, hasMore, isLoading],
  );

  return (
    <div className={styles.productsContainer}>
      {quizHeaderInfo?.value && <ProductsHeader {...quizHeaderInfo} />}

      <ProductsSorting
        isLoading={isLoading}
        handleOpenModal={handleOpenModal}
        selectedCategoriesCount={selectedCategoriesCount}
      />
      <ProductsTags />
      <ProductsList
        loadMoreProducts={loadMoreProducts}
        products={products}
        isButton={isButton}
        isLoading={isLoading}
      />
    </div>
  );
};
