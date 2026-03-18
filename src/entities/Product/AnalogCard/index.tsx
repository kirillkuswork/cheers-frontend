/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @next/next/no-img-element */
import {
  FC, useState, useMemo,
} from 'react';
import { CardTag, ProductCardRate } from '@/shareds';
import { Expert, Star } from '@/assets/icons';
import { IProduct } from '@/redux/services/types/products';
import image from '@/assets/images/vine.png';
import { FavoritesButton } from '@/temporal/FavoritesButton';
import getVolumeUnit from '@/shareds/helpres/getVolumeUnit';
import styles from './styles.module.scss';

export const AnalogCard: FC<IProduct> = (props) => {
  const {
    id,
    rating_expert,
    rating_customer,
    image_url: imageUrl,
    name,
    properties,
    is_liked: isLiked,
    old_price: oldPrice,
    price,
    discount,
  } = props;

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
          <span className={styles.title}>
            {name}
          </span>
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
        </div>
      </div>
    </div>
  );
};
