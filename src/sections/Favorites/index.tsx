import { Paper } from '@/admin/components/Paper';
import { FavoritesList } from '@/features/Favorites';
import { useEffect, useMemo, useState } from 'react';
import { COORDINATES } from '@/shareds/consts/baseConts';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { useGetFavoritesQuery } from '@/redux/services/favoriteApi';
import { InfinityScroll } from '@/shareds/ui';
import styles from './styles.module.scss';

export const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [cursor, setCursor] = useState<string | null>(null);

  const dataProps = useMemo(() => ({
    coordinates: COORDINATES,
    pagination: {
      cursor,
      limit: 24,
    },
  }), [cursor]);

  const { data, isFetching, refetch } = useGetFavoritesQuery(dataProps);

  const handleClickOnMore = () => {
    if (data) {
      setCursor(data.pagination.cursor);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Paper className={styles.wrapper}>
      <InfinityScroll
        isLoading={isFetching}
        handleOnFetch={handleClickOnMore}
        hasNextPage={data?.pagination.cursor !== 'disabled'}
      >
        <FavoritesList
          data={data}
          isLoading={isFetching}
          handleShowMore={handleClickOnMore}
        />
      </InfinityScroll>
    </Paper>
  );
};
