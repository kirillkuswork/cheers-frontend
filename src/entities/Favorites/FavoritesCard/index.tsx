/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @next/next/no-img-element */
import {
  FC, useState, useMemo,
  SyntheticEvent,
} from 'react';
import { Button, CardTag, ProductCardRate } from '@/shareds';
import { Expert, MapPin, Star } from '@/assets/icons';
import { IProduct } from '@/redux/services/types/products';
import image from '@/assets/images/vine.png';
import { FavoritesButton } from '@/temporal/FavoritesButton';
import getVolumeUnit from '@/shareds/helpres/getVolumeUnit';
import metersToKilometers from '@/shareds/helpres/metersToKilometers';
import { useRouter } from 'next/router';
import { PATHS } from '@/shareds/consts/baseConts';
import styles from './styles.module.scss';

export const FavoritesCard: FC<IProduct> = (props) => {
  const {
    id,
    rating_expert,
    rating_customer,
    image_url: imageUrl,
    producer,
    name,
    properties,
    is_liked: isLiked,
    old_price: oldPrice,
    price,
    offer,
    discount,
  } = props;

  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<string>(imageUrl! || image.src);

  const { volume, ...otherProperties } = properties!;
  const propertyValues = useMemo(() => [
    ...Object.values(otherProperties).filter(Boolean),
    volume ? `${volume} ${getVolumeUnit(volume)}` : null,
  ]
    .filter(Boolean)
    .join(', '), [otherProperties, volume]);

  const handleImageError = () => {
    setImgSrc(image.src);
  };

  const distance = useMemo(() => (offer ? metersToKilometers(offer.distance) : null), [offer]);
  const handleToPartners = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`${PATHS.products}/${id}#partners`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <div className={styles.rate}>
          <ProductCardRate icon={<Expert />} value={rating_expert} />
          <ProductCardRate icon={<Star />} value={rating_customer} />
        </div>
        <FavoritesButton
          className={styles.wishlist}
          productId={id}
          defaultLikedValue={isLiked}
        />
        <img
          className={styles.img}
          src={imgSrc}
          alt="Вино"
          draggable={false}
          onError={handleImageError}
        />
        {Boolean(discount) && (
          <CardTag
            className={styles.tag}
            discount={discount || 0}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.text}>
          <span className={styles.title}>{name}</span>
          <span className={styles.description}>
            {propertyValues}
          </span>
        </div>
        <div className={styles.price}>
          {price && (
            <div className={styles.priceInner}>
              {(oldPrice && discount) && (
                <div className={styles.sale}>
                  <span className={styles.oldPrice}>
                    {`${oldPrice} ₽`}
                  </span>
                  <span className={styles.percent}>
                    {`${discount} %`}
                  </span>
                </div>
              )}
              <span className={styles.currentPrice}>
                {`от ${price} ₽`}
              </span>
            </div>
          )}
          {/* {offer && (
            <div className={styles.stores}>
              <span className={styles.mapPinIcon}>
                <MapPin />
              </span>
              <span className={styles.storeName}>
                {`${distance} км`}
                {Boolean(offer.offers_count) && ` и еще ${offer.offers_count}`}
              </span>
            </div>
          )} */}
          {offer ? (
            <Button
              label="К предложениям"
              variant="primary"
              className={styles.button}
              onClick={(e) => handleToPartners(e)}
            />
          ) : (
            <Button
              label="Посмотреть"
              variant="primary"
              className={styles.button}
            />
          )}
        </div>
      </div>
    </div>
  );
};
