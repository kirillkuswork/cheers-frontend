/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, HTMLAttributes, useCallback, useEffect, useMemo,
} from 'react';
import { PartnerOffersCard } from '@/admin/sections/Management/ProductManagement/PartnerOffersCard';
import { Container } from '@/admin/components/Container';
import { IOffer } from '@/redux/services/types/admin';
import { BlockingMessage, Button, Skeletons } from '@/shareds';
import { useLazyGetAdminOffersQuery } from '@/redux/services/adminApi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import image from '@/assets/images/wineGlass.png';
import ArrayRender from '../../../../../shareds/utils/components/ArrayRender';
import styles from './styles.module.scss';

interface IPartnerOffersProps extends HTMLAttributes<HTMLDivElement> {}

const skeletons = Array.from({ length: 4 }, (_, index) => (
  <Skeletons.AdminPartnerCardSkeleton key={index} />
));

export const PartnerOffers: FC<IPartnerOffersProps> = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [getOffers, { isFetching }] = useLazyGetAdminOffersQuery();

  const { offersData, isOffersError } = useSelector(selectors.adminSelector);
  const { setOffersData } = useActions(adminActions);

  const renderItem = useCallback(
    (card: IOffer) => (
      <PartnerOffersCard {...card} key={card.id} />
    ),
    [],
  );

  useEffect(() => {
    setOffersData(null);
    getOffers({
      productId: Number(id),
      pagination: {
        cursor: null,
        limit: 20,
      },
    }).then((res) => {
      if (res.data) {
        setOffersData(res.data);
      }
    });
  }, []);

  const loadMoreProducts = useCallback(() => {
    getOffers({
      productId: Number(id),
      pagination: { cursor: offersData?.pagination?.cursor || null, limit: 20 },
    }).then((res) => {
      if (res.data) {
        setOffersData({
          ...offersData,
          offers: [
            ...(offersData?.offers || []),
            ...(res.data.offers),
          ],
          pagination: res.data.pagination,
        });
      }
    });
  }, [offersData, getOffers, setOffersData]);

  const isButton = useMemo(
    () => !!offersData?.offers.length && !!offersData?.pagination.cursor,
    [offersData?.offers.length],
  );

  if (offersData?.offers.length === 0 || isOffersError) {
    return (
      <BlockingMessage
        image={image}
        className={styles.blockingMessage}
        title="Пока тут ничего нет"
        subtitle="Появится тут после того как вы добавите новое предложение"
      />
    );
  }

  return (
    <Container className={styles.inner}>
      <div className={styles.wrapper}>
        <ArrayRender items={offersData?.offers} renderItem={renderItem} />
        {isFetching && skeletons}
        {isButton && !isFetching && (
        <Button
          label="Загрузить еще"
          variant="tertiary"
          size="large"
          onClick={loadMoreProducts}
        />
        )}
      </div>
    </Container>
  );
};
