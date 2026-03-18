/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  useCallback, useEffect, useState,
} from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface IProps {
  text: string;
  className?: string;
  minTextHeight?: number;
}

export const TextShowMore = ({
  text,
  className,
  minTextHeight = 120,
}: IProps) => {
  const textWrapperAnimation = {
    hidden: {
      height: minTextHeight,
    },
    visible: {
      height: 'max-content',
    },
  };

  const [showMore, setShowMore] = useState(false);
  const [descHeight, setDescHeight] = useState<number>(0);
  const [descElement, setDescElement] = useState<HTMLDivElement | null>(null);

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const onRefChange = useCallback((node: HTMLDivElement) => {
    if (node) {
      setDescElement(node);
    }
  }, []);

  useEffect(() => {
    if (descElement) {
      // вычисляем высоту описания, если больше чем надо,
      // то обрезаем и показываем кнопку ShowMoreButton
      const descHeightValue = descElement.offsetHeight;
      if (descHeightValue >= minTextHeight) {
        setDescHeight(descHeightValue);
        setShowMore(false);
      } else if (descHeightValue < minTextHeight) {
        setDescHeight(descHeightValue);
      }
    }
  }, [descElement, minTextHeight, text]);

  return (
    <div className={clsx(
      styles.wrapper,
      className,
    )}
    >
      <motion.div
        className={clsx({
          [styles.textWrapper]: true,
          [styles.textWrapperMaxContent]: descHeight < minTextHeight,
        })}
        variants={textWrapperAnimation}
        initial="hidden"
        animate={showMore ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, type: 'tween' }}
      >
        <div
          className={styles.text}
          ref={onRefChange}
        >
          {text}
        </div>
      </motion.div>
      {descHeight > minTextHeight && (
        <div
          onClick={handleToggleShowMore}
          className={styles.button}
        >
          {!showMore ? 'Читать полностью' : 'Скрыть'}
        </div>
      )}
    </div>
  );
};

export default TextShowMore;
