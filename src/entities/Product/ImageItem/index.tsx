/* eslint-disable @next/next/no-img-element */
import { ProductTop } from '@/shareds/ui';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { IImageItemProps } from './types';

function ImageItem(props: IImageItemProps) {
  const {
    imageUrl,
    worldPlace,
    regionPlace,
    vineyardPlace,
    className,
  } = props;

  return (
    <div className={clsx(styles.wrapper, className)}>
      <ProductTop
        worldPlace={worldPlace}
        regionPlace={regionPlace}
        vineyardPlace={vineyardPlace}
      />
      {imageUrl && (
        // TODO заменить на некстовский Img, когда будет ясно что делать с ошибкой
        <img
          alt="Product"
          className={styles.img}
          src={imageUrl}
          draggable="false"
        />
        // <Image
        //   alt="Product"
        //   className={styles.img}
        //   src={imageUrl}
        //   fill
        // />
      )}
    </div>
  );
}

export default ImageItem;
