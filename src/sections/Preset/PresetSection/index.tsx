import { useMemo } from 'react';
import { PresetList } from '@/features/Preset';
import { IProduct } from '@/redux/services/types/products';
import { Paper } from '@/admin/components/Paper';
import { InfinityScroll, ShareButton } from '@/shareds/ui';
import { PresetSorting } from '@/entities/Preset';
import styles from './styles.module.scss';

interface IPresetSection {
  products: IProduct[];
  loadMoreProducts: () => void;
  isLoading: boolean;
  hasMore: boolean;
  limit: number;
}

export const PresetSection = ({
  products,
  hasMore,
  loadMoreProducts,
  isLoading,
  limit,
}: IPresetSection) => {
  const isButton = useMemo(
    () => !!products.length && hasMore && !isLoading,
    [products.length, hasMore, isLoading],
  );

  return (
    <Paper className={styles.paper}>
      <div className={styles.heading}>
        <ShareButton />
        <PresetSorting isLoading={isLoading} />
      </div>

      <InfinityScroll
        isLoading={isLoading}
        handleOnFetch={loadMoreProducts}
        hasNextPage={hasMore}
      >
        <PresetList
          loadMoreProducts={loadMoreProducts}
          products={products}
          isButton={isButton}
          isLoading={isLoading}
          limit={limit}
        />
      </InfinityScroll>
    </Paper>
  );
};
