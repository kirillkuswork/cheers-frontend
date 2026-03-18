/* eslint-disable @next/next/no-img-element */
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import styles from './styles.module.scss';

export const RatingModalProductInfo = () => {
  const { activeProduct } = useSelector(selectors.productSelector);
  const { image_url: imgUrl, name } = activeProduct;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={imgUrl} alt="vino" className={styles.img} />
      </div>
      <div className={styles.title}>
        {name}
      </div>
    </div>
  );
};
