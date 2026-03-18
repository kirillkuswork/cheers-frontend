import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IBanner } from '@/redux/services/types/banners';
import { AdvertTag } from '@/shareds';
import { CustomTooltip } from '@/shareds/ui/CustomTooltip';
import styles from './styles.module.scss';

export const ProductCardBanner: FC<Partial<IBanner>> = (props) => {
  const {
    link,
    image_url: imageUrl,
    is_advert: isAdvert,
    advertiser_name: advertiserName,
    erid,
  } = props;
  return (
    <div className={styles.productCardBanner}>
      <Link key="" href={link!} className={styles.imgWrapper}>
        <Image className={styles.img} fill alt="баннер" src={imageUrl!} />
      </Link>
      {isAdvert && (
        <CustomTooltip placement="bottomLeft" isInverted title={`${advertiserName}, erid:${erid}`}>
          <AdvertTag className={styles.tag} label="Реклама" />
        </CustomTooltip>
      )}
    </div>
  );
};
