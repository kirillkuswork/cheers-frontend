/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, HTMLAttributes, useCallback, useMemo,
} from 'react';
import clsx from 'clsx';
import { Button, Skeletons } from '@/shareds';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { IAdminProduct, IGetAdminProductsResponse } from '@/redux/services/types/admin';
import { BlockingMessage } from '@/shareds/ui/BlockingMessage';
import image from '@/shareds/assets/images/wineGlass.png';
import Link from 'next/link';
import { ProductListCard } from '../ProductListCard';
import styles from './styles.module.scss';

interface IProductListProps extends HTMLAttributes<HTMLDivElement> {
  loadMoreProducts?: () => void;
  productsData: IGetAdminProductsResponse;
}

const skeletons = Array.from({ length: 6 }, (_, index) => (
  <Skeletons.AdminProductCardSkeleton key={index} />
));

export const ProductList: FC<IProductListProps> = ({
  className,
  loadMoreProducts,
  productsData,
}) => {
  const { isProductsLoading, isProductsError } = useSelector(
    selectors.adminSelector,
  );

  const renderItem = useCallback(
    (card: IAdminProduct) => (
      <Link className={styles.link} href={`/admin/products/edit/${card.id}`}>
        <ProductListCard {...card} key={card.id} />
      </Link>
    ),
    [],
  );

  const isButton = useMemo(
    () => !!productsData?.products.length && !!productsData?.pagination.cursor,
    [productsData?.products.length],
  );

  if (productsData?.products.length === 0 || isProductsError) {
    return (
      <BlockingMessage
        image={image}
        className={styles.blockingMessage}
        title="Пока тут ничего нет"
        subtitle=""
      />
    );
  }

  return (
    <div className={clsx(styles.list, className)}>
      <ArrayRender items={productsData?.products} renderItem={renderItem} />
      {isProductsLoading && (
        <div className={styles.skeletonsList}>
          {skeletons}
          <Skeletons.LoadMoreButtonSkeleton />
        </div>
      )}
      {isButton && !isProductsLoading && (
        <Button
          label="Загрузить еще"
          variant="tertiary"
          size="large"
          onClick={loadMoreProducts}
        />
      )}
    </div>
  );
};
