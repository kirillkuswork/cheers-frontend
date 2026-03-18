import getNoun from '@/shareds/helpres/getNoun';
import { ArrayRender } from '@/shareds/utils/components';
import { useCallback, useMemo } from 'react';
import { IStatisticForProduct } from '@/redux/services/types/products';
import styles from './styles.module.scss';

interface IProps {
  stat: IStatisticForProduct | undefined;
}

const RatingBlockItems = ({
  stat,
}: IProps) => {
  const total = stat?.total || 0;
  // Массив ключей от 5 до 1
  const arrayKeys = useMemo(() => Array.from({ length: 5 }, (_, index) => index + 1).reverse(), []);
  const handleNoun = (value: number) => getNoun(value, ['звезда', 'звезды', 'звёзд']);
  const calcPercent = useCallback((value: number) => Math.round((value / total) * 1000) / 10, [total]);
  const calcWidth = useCallback((value: number) => stat && `${calcPercent(stat[value as keyof object])}%`, [calcPercent, stat]);

  const renderItem = useCallback((value: number) => (
    <div key={`${value}_${calcWidth(value)}`} className={styles.item}>
      <div className={styles.left}>
        {value}
        {' '}
        {handleNoun(value)}
      </div>
      <div className={styles.mid}>
        <div className={styles.grayLine} />
        <div
          className={styles.redLine}
          style={{ width: calcWidth(value) }}
        />
      </div>
      {stat && (
        <div className={styles.left}>
          {stat[value as keyof object]}
        </div>
      )}
    </div>
  ), [calcWidth, stat]);
  return (
    <div className={styles.wrapper}>
      <ArrayRender
        items={arrayKeys}
        renderItem={renderItem}
      />
    </div>
  );
};

export default RatingBlockItems;
