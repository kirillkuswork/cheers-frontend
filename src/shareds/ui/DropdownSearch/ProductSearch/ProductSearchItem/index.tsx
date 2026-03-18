/* eslint-disable @next/next/no-img-element */
import { ProductCardRate } from '@/shareds/ui/ProductCardRate';
import { Expert, Star } from '@/shareds/assets/icons';
import removeEmptyFields from '@/shareds/helpres/removeEmptyFields';
import { ArrayRender } from '@/shareds/utils/components';
import { ISeacrhItemDescProps, ISearchItemProps } from '../types';
import styles from './styles.module.scss';
import { ProductSearchDescItem } from './ProductSearchDescItem';

interface IProps {
  props: ISearchItemProps;
}

export const ProductSearchItem = ({ props }: IProps) => {
  const {
    name,
    image_url: imageUrl,
    rating_expert: ratingExpert,
    rating_customer: ratingCustomer,
    properties,
  } = props;

  const neededProps: ISeacrhItemDescProps = {
    country: properties?.country,
    color: properties?.color,
    sweetness: properties?.sweetness,
    volume: properties?.volume,
  };

  const finalProps = removeEmptyFields(neededProps);
  const descKeys = Object.keys(finalProps);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        {imageUrl && (
          <img
            className={styles.img}
            src={imageUrl}
            alt="product"
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {name}
        </div>
        <div className={styles.desc}>
          <ArrayRender
            items={descKeys}
            renderItem={(item, idx) => (
              <ProductSearchDescItem
                key={item}
                idx={idx}
                name={item}
                value={neededProps[item as keyof ISeacrhItemDescProps] || ''}
              />
            )}
          />
        </div>
        <div className={styles.ratingWrap}>
          <ProductCardRate
            icon={<Expert />}
            value={ratingExpert}
          />
          <ProductCardRate
            icon={<Star />}
            value={ratingCustomer}
          />
        </div>
      </div>
    </div>
  );
};
