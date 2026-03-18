import { IImageItemProps } from '@/entities/Product/ImageItem/types';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { TOP_INFO } from './constants';

function ProductTop(props: Omit<IImageItemProps, 'imageUrl'>) {
  const {
    worldPlace,
    regionPlace,
    vineyardPlace,
  } = props;

  const topArr = [worldPlace, regionPlace, vineyardPlace];

  return (
    <div className={styles.wrapper}>
      {topArr.map((top, index) => (
        <React.Fragment key={TOP_INFO[index].text}>
          {!!top && (
            <div className={styles.item}>
              <span className={styles.icon}>
                {TOP_INFO[index].icon}
              </span>
              <span className={styles.text}>
                {`Топ ${top}%`}
              </span>
              <span className={clsx(styles.text, styles.textSlim)}>
                &nbsp;
                {TOP_INFO[index].text}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProductTop;
