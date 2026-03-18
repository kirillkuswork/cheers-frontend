/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { Button } from '@/shareds/ui';
import { Store } from '@/shareds/assets/icons';
import { FavoritesButton } from '@/temporal/FavoritesButton';
import { IProductOffer, IPropertiesCurrent } from '@/redux/services/types/products';
import { useRouter } from 'next/router';
import { createUrlWithQuery } from '@/shareds/utils/filtersUtils';
import { transformValuesToArray } from '@/shareds/helpres/transformValuesToArray';
import Link from 'next/link';
import { PromocodeButton } from '@/temporal/PromocodeButton';
import styles from './styles.module.scss';

interface IProps {
  className?: string;
  productId: number | undefined;
  isLiked: boolean | undefined;
  properties: IPropertiesCurrent | undefined;
  offer: IProductOffer | undefined | null;
}

export const MainSectionPartners: FC<IProps> = ({
  className,
  productId,
  isLiked = false,
  properties = {},
  offer,
}) => {
  const router = useRouter();
  const handleLookForSimilar = () => {
    const similarUrl = createUrlWithQuery('products', transformValuesToArray(properties as Record<string, string>));
    router.push(similarUrl);
  };
  const handleToPartners = () => router.push('#partners');

  const {
    link,
    old_price: oldPrice,
    price,
    discount,
    address,
    promo,
    partner,
  } = useMemo(() => offer || {} as IProductOffer, []);

  if (!offer) {
    return (
      <div className={clsx(styles.wrapper, className)}>
        <div className={styles.info}>
          <div className={styles.address}>
            <Store />
            <span className={styles.address_text}>
              Нет предложений в магазинах
            </span>
          </div>
          <div className={styles.bottom}>
            <Button
              label="Смотреть похожие"
              size="large"
              variant="secondary"
              onClick={handleLookForSimilar}
            />
            {productId && (
              <FavoritesButton
                buttonClassName={styles.wishlist}
                productId={productId}
                defaultLikedValue={isLiked || false}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.info}>
        <div className={styles.text}>
          <div className={styles.price}>
            <div className={styles.currentPrice}>
              {price ? `${price} ₽` : 'Нет цены'}
            </div>
            {Boolean(discount) && (
              <>
                <div className={styles.oldPrice}>
                  {`${oldPrice} ₽`}
                </div>
                <div className={styles.percent}>
                  {Boolean(promo) && 'Промокод '}
                  {`-${discount} %`}
                </div>
              </>
            )}
          </div>
          {Boolean(address) && (
            <div className={styles.address}>
              <Store />
              <span className={styles.address_text}>
                {`${partner.name}${partner.name && address ? ', ' : ''}${address}`}
              </span>
            </div>
          )}
          {Boolean(promo) && (
            <div className={styles.promo}>
              <div className={styles.promo_info}>
                <div className={styles.promo_text}>
                  Ваш промокод на скидку
                </div>
                <PromocodeButton
                  imgUrl={partner.image_url || ''}
                  promocode={promo?.value || ''}
                  description={promo?.description || ''}
                  discount={discount}
                  partnerLink={link || ''}
                />
              </div>
              {Boolean(promo?.description) && (
                <div className={styles.promo_description}>
                  {promo?.description}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <Link
            target="_blank"
            href={link || ''}
            className={styles.link}
          >
            <Button
              label="В магазин"
              size="large"
              className={styles.button}
            />
          </Link>
          {productId && (
            <FavoritesButton
              buttonClassName={styles.wishlist}
              productId={productId}
              defaultLikedValue={isLiked || false}
            />
          )}
        </div>
      </div>
      <Button
        label="Другие предложения"
        variant="tertiary"
        className={styles.button}
        onClick={handleToPartners}
      />
    </div>
  );
};
