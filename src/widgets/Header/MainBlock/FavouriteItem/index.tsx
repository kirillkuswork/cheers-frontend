/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { Wishlist } from '@/assets/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

interface IProps {
  className?: string;
}
export const FavoriteItem: FC<IProps> = ({
  className,
}: IProps) => {
  const router = useRouter();
  const handleToFavorites = () => router.push('/favorites');
  // const { isAuthenticated } = useAuth();

  // const coordinates = {
  //   lat: -90,
  //   lon: -180,
  // };

  // const dataProps = {
  //   coordinates,
  //   pagination: {
  //     cursor: null,
  //     limit: 100,
  //   },
  // };

  // const { data, refetch } = useGetFavoritesQuery(dataProps);
  // const favouritesCount = data ? data.products.length : 0;

  // useEffect(() => {
  //   refetch();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return (
    <button
      type="button"
      onClick={handleToFavorites}
      className={clsx(styles.item, className)}
      aria-label="Навигация на Изброанное"
    >
      <span className={styles.iconWrapper}>
        <span className={styles.icon}>
          <Wishlist />
          {/* {(favouritesCount > 0 && isAuthenticated) && (
            <div className={styles.counter}>
              {favouritesCount > 99 ? '99+' : favouritesCount}
            </div>
          )} */}
        </span>
      </span>
      <span className={styles.text}>Избранное</span>
    </button>
  );
};
