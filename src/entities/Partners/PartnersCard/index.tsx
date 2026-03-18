/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, CardTag, IconButton } from '@/shareds/ui';
import { MapPin } from '@/shareds/assets/icons';
import { IOfferItem } from '@/redux/services/types/products';
import Link from 'next/link';
import { useMemo } from 'react';
import metersToKilometers from '@/shareds/helpres/metersToKilometers';
import { PromocodeButton } from '@/temporal/PromocodeButton';
import styles from './styles.module.scss';

export const PartnersCard = ({
  price,
  old_price: oldPrice,
  address,
  link = '',
  work_hour_from: workHourFrom,
  work_hour_to: workHourTo,
  phone,
  distance,
  promo,
  discount,
  partner,
  metro,
}: IOfferItem) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const distanceTransform = useMemo(() => (distance ? metersToKilometers(distance) : null), [distance]);
  const hourTransform = (hours: string) => hours.slice(0, -3);

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        {Boolean(discount) && (
          <CardTag
            text={promo ? 'Промокод' : 'Скидка'}
            discount={discount}
            className={styles.tag}
          />
        )}
        {(!!distanceTransform || metro?.name) && (
          <div className={styles.info}>
            {Boolean(distanceTransform) && `${distanceTransform} км`}
            {(!!distanceTransform && metro?.name) && <span className={styles.dot}>.</span>}
            {metro?.name && `м. ${metro.name}`}
          </div>
        )}
        {Boolean(partner?.name) && (
          <div className={styles.title}>
            {partner.name}
          </div>
        )}
      </div>
      <div className={styles.mid}>
        {address && (
          <div className={styles.address}>
            {address}
          </div>
        )}
        <div className={styles.info}>
          {(workHourFrom && workHourTo) && (
            <div>
              {`Пн-вс: ${hourTransform(workHourFrom)}-${hourTransform(workHourTo)}`}
            </div>
          )}
          {phone && (
            <div>{`Телефон: ${phone}`}</div>
          )}
        </div>
      </div>
      <div className={styles.right}>
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
                {`-${discount} %`}
              </div>
            </>
          )}
        </div>
        {Boolean(promo) && (
          <div className={styles.promo}>
            <div className={styles.promo_info}>
              <div className={styles.promo_title}>Ваш промокод на скидку </div>
              <PromocodeButton
                imgUrl={partner.image_url || ''}
                promocode={promo?.value || ''}
                description={promo?.description || ''}
                discount={discount}
                partnerLink={link || ''}
              />
            </div>
            {Boolean(promo.description) && (
              <div className={styles.promo_description}>
                {promo.description}
              </div>
            )}
          </div>
        )}
        <div className={styles.buttons}>
          <Link
            href={link || ''}
            target="_blank"
            className={styles.link}
          >
            <Button
              label="На сайт магазина"
              className={styles.button}
            />
          </Link>
          <IconButton icon={<MapPin />} disabled />
        </div>
      </div>
    </div>
  );
};

export default PartnersCard;
