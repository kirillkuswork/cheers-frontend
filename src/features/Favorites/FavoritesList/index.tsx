/* eslint-disable react/jsx-no-useless-fragment */
// eslint-disable-next-line import/no-cycle
import { useCallback, useState } from 'react';
import {
  BlockingMessage, Button, PartialInfinityScroll, Skeletons,
} from '@/shareds';
import Link from 'next/link';
import { IProduct } from '@/redux/services/types/products';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { FavoritesCard } from '@/entities/Favorites';
import image from '@/assets/images/wineBottle.png';
import { AuthModal } from '@/widgets/Header/AuthModal';
import { useRouter } from 'next/router';
import { PATHS } from '@/shareds/consts/baseConts';
import { IGetFavoritesResponse } from '@/redux/services/types/favorite';
import { useAuth } from '@/shareds/providers/AuthProvider';
import styles from './styles.module.scss';

interface IFavoritesListProps {
  data: IGetFavoritesResponse | undefined;
  isLoading: boolean;
  handleShowMore: () => void;
}

export const FavoritesList = ({
  data,
  isLoading,
  handleShowMore,
}: IFavoritesListProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skeletons = Array.from({ length: 24 }, (_, index) => (
    <Skeletons.FavoriteCardSkeleton key={index} />
  ));

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const handleToCatalog = useCallback(() => router.push('/'), [router]);

  const cardsRender = useCallback((item: IProduct) => (
    <Link key={item.id} href={`${PATHS.products}/${item.id}`}>
      <FavoritesCard {...item} />
    </Link>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [data]);

  if (!isAuthenticated) {
    return (
      <>
        <BlockingMessage
          image={image}
          title="В избранном пока пусто"
          subtitle="Войдите, чтобы сохранить любимые товары в аккаунте"
          buttonLabel="Войти"
          onClick={handleModalOpen}
          showButton
        />
        <AuthModal isOpen={isModalOpen} onClose={handleModalClose} />
      </>
    );
  }

  if (data?.products.length === 0 && !isLoading) {
    return (
      <BlockingMessage
        image={image}
        title="В избранном пока пусто"
        subtitle="Чтобы добавлять товары, нажимайте на ♡"
        buttonLabel="В каталог"
        onClick={handleToCatalog}
        showButton
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <PartialInfinityScroll
          isLoading={isLoading}
          skeleton={skeletons}
          limit={24}
          itemsLength={data?.products.length || 0}
        >
          <ArrayRender items={data?.products} renderItem={cardsRender} />
        </PartialInfinityScroll>
      </div>

      {(data?.pagination.cursor !== 'disabled') && (
        <>
          {isLoading ? <Skeletons.LoadMoreButtonSkeleton /> : (
            <Button
              label="Загрузить еще"
              variant="tertiary"
              onClick={handleShowMore}
            />
          )}
        </>
      )}
    </div>
  );
};
