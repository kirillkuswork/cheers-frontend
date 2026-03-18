import React, { FC } from 'react';
import { Skeletons } from '@/shareds';
import { IProductsContainerProps } from '@/widgets/Products/ProductsContainer/types';
import styles from '../ProductsList/styles.module.scss';

interface IProductsListSkeletonsProps
  extends Pick<IProductsContainerProps, 'isButton'> {}

export const ProductsListSkeletons: FC<IProductsListSkeletonsProps> = ({
  isButton,
}) => {
  const skeletons = Array.from({ length: 20 }, (_, index) => (
    <Skeletons.ProductCardSkeleton key={index} />
  ));

  return (
    <div className={styles.productsListWrapper}>
      <div className={styles.productsList}>{skeletons}</div>
      {isButton && <Skeletons.LoadMoreButtonSkeleton />}
    </div>
  );
};
