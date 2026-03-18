import { useCallback } from 'react';
import { IProduct } from '@/redux/services/types/products';
import { PATHS } from '@/shareds/consts/baseConts';
import { ProductCard } from '@/entities/Products';
import {
  BlockingMessage, Button, PartialInfinityScroll, Skeletons,
} from '@/shareds/ui';
import { ArrayRender } from '@/shareds/utils/components';
import Link from 'next/link';
import styles from './styles.module.scss';

interface IPresetList {
  products: IProduct[];
  loadMoreProducts: () => void;
  isLoading: boolean;
  isButton: boolean;
  limit: number;
}

export const PresetList = ({
  products,
  loadMoreProducts,
  isLoading,
  isButton,
  limit,
}: IPresetList) => {
  const skeletons = Array.from({ length: 24 }, (_, index) => (
    <Skeletons.ProductCardSkeleton key={index} />
  ));

  const cardsRender = useCallback((item: IProduct) => (
    <Link className={styles.link} key={item.id} href={`${PATHS.products}/${item.id}`}>
      <ProductCard {...item} />
    </Link>
  ), []);

  const contentRender = !products.length && !isLoading ? (
    <BlockingMessage
      className={styles.blockingMessage}
      title="Такого пресета не существует"
      subtitle=""
    />
  ) : (
    <div className={styles.productsList}>
      <PartialInfinityScroll
        isLoading={isLoading}
        skeleton={skeletons}
        limit={limit}
        itemsLength={products.length}
      >
        <ArrayRender items={products} renderItem={cardsRender} />
      </PartialInfinityScroll>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {contentRender}

      {isButton && (
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

export default PresetList;
