/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Expert, Star } from '@/shareds/assets/icons';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';

interface IProps {
  ratingValue: number | null;
  isExpert?: boolean;
  onClick?: (prop: number) => void;
  size?: 's' | 'l';
}

export const Rating = ({
  ratingValue,
  isExpert = false,
  onClick,
  size = 's',
}: IProps) => {
  const icon = useMemo(() => (isExpert ? <Expert /> : <Star />), [isExpert]);

  const handleOnClick = useCallback((index: number) => {
    if (onClick) {
      onClick(index + 1);
    }
    return undefined;
  }, [onClick]);

  return (
    <div className={clsx(
      styles.wrapper,
      styles[`wrapper_${size}`],
    )}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={clsx({
            [styles.icon]: true,
            [styles[`icon_${size}`]]: size,
            [styles.iconGray]: index >= Math.round(ratingValue || 0),
            [styles.iconClickable]: onClick,
          })}
          onClick={() => handleOnClick(index)}
        >
          {icon}
        </span>
      ))}
    </div>
  );
};

export default Rating;
