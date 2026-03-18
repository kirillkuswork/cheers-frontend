/* eslint-disable react-hooks/exhaustive-deps */
import { useIsElementVisible } from '@/shareds/hooks/useIsElementVisible';
import {
  FC,
  ReactNode,
  useEffect, useRef,
} from 'react';
import styles from './styles.module.scss';

interface IInfinityScrollProps {
  isLoading: boolean;
  handleOnFetch: () => void;
  hasNextPage: boolean;
  children: ReactNode;
}

export const InfinityScroll: FC<IInfinityScrollProps> = ({
  children,
  handleOnFetch,
  hasNextPage,
  isLoading,
}) => {
  const endPageRef = useRef<HTMLDivElement>(null);
  const isEndRefInViewPort = useIsElementVisible(endPageRef);

  useEffect(() => {
    if (hasNextPage && isEndRefInViewPort && !isLoading) {
      handleOnFetch();
    }
  }, [isEndRefInViewPort]);

  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.bottomRef} ref={endPageRef} />
    </div>
  );
};
