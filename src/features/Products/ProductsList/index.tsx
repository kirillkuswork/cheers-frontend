import { ProductCard } from '@/entities/Products';
import { FC, useCallback } from 'react';
import { BlockingMessage, Button, PartialInfinityScroll } from '@/shareds';
import Link from 'next/link';
import { IProductsContainerProps } from '@/widgets/Products/ProductsContainer/types';
import image from '@/assets/images/wineGlass.png';
import { ProductCardBanner } from '@/entities/Products/ProductCardBanner';
import { IProduct } from '@/redux/services/types/products';
import { IBanner } from '@/redux/services/types/banners';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { PATHS } from '@/shareds/consts/baseConts';
import styles from './styles.module.scss';
import { ProductsListSkeletons } from '../ProductsListSkeletons';

interface IProductsListProps
  extends Pick<
  IProductsContainerProps,
  'products' | 'loadMoreProducts' | 'isButton' | 'isLoading'
  > { }

export const ProductsList: FC<IProductsListProps> = ({
  products,
  isButton,
  loadMoreProducts,
  isLoading,
}) => {
  const cardsRender = useCallback((item: IProduct | IBanner) => {
    if ('name' in item) {
      return (
        <Link key={item.id} href={`${PATHS.products}/${item.id}`}>
          <ProductCard {...item} />
        </Link>
      );
    }
    return <ProductCardBanner key={`banner-${item.id}`} {...item} />;
  }, []);

  const contentRender = (!products.length && !isLoading) ? (
    <BlockingMessage
      image={image}
      className={styles.blockingMessage}
      title="Ничего не нашлось"
      subtitle=""
    />
  ) : (
    <PartialInfinityScroll
      isLoading={isLoading}
      skeleton={<ProductsListSkeletons isButton={isButton} />}
      limit={20}
      itemsLength={products.length}
    >
      <div className={styles.productsList}>
        <ArrayRender items={products} renderItem={cardsRender} />
      </div>
    </PartialInfinityScroll>
  );

  return (
    <div className={styles.productsListWrapper}>
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
