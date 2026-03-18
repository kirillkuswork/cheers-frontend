import { FC, useEffect, useState } from 'react';
import { PartnersCard } from '@/entities/Partners';
import { Button, Skeletons } from '@/shareds/ui';
import { useLazyGetOffersQuery } from '@/redux/services/productsApi';
import { useDynamicId } from '@/temporal/useGetId';
import { error } from '@/shareds/helpres/AlertHelpers';
import { IOfferItem } from '@/redux/services/types/products';
import { COORDINATES } from '@/shareds/consts/baseConts';
import styles from './styles.module.scss';

export const PartnersList: FC = () => {
  const [partnersData, setPartnersData] = useState<IOfferItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const productId = useDynamicId();

  const getOffersProps = {
    coordinates: COORDINATES,
    id: productId || '',
    limit: 3,
    cursor,
  };
  const [getOffers, { isFetching }] = useLazyGetOffersQuery();

  const handleLoadMore = () => {
    getOffers(getOffersProps).then((res) => {
      if (res.isSuccess) {
        setCursor(res.data.pagination.cursor);
        setPartnersData((prev) => [...prev, ...res.data.offers] as IOfferItem[]);
      }
      if (res.isError) error('Ошибка загрузки предложений партнеров');
    });
  };

  useEffect(() => {
    if (productId) {
      getOffers(getOffersProps).then((res) => {
        if (res.isSuccess) {
          setCursor(res.data.pagination.cursor);
          setPartnersData(res.data.offers);
        }
        if (res.isError) error('Ошибка загрузки предложений партнеров');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  // if (isFetching) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.list}>
  //         <Skeletons.ProductSkeleton.PartnersSectionSkeleton />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.wrapper}>

      <div className={styles.list}>
        {partnersData.map((item: IOfferItem) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <PartnersCard key={item.id} {...{ ...item, ...(item as any)?.office }} />
        ))}
        {
          isFetching && (
          <div className={styles.wrapper}>
            <div className={styles.list}>
              <Skeletons.ProductSkeleton.PartnersSectionSkeleton />
            </div>
          </div>
          )
        }
      </div>

      {cursor && (
        <Button
          variant="tertiary"
          label="Загрузить еще"
          className={styles.button}
          onClick={handleLoadMore}
        />
      )}
    </div>
  );
};
