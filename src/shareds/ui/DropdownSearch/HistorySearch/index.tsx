import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ArrayRender } from '@/shareds/utils/components';
import Link from 'next/link';
import { createSearchLink } from '@/shareds/helpres/createSearchLink';
import styles from './styles.module.scss';
import { HistorySearchItem } from './HistorySearchItem';
import { SearchWrapper } from '../SearchWrapper';

interface IProps {
  onClose: () => void;
}

export const HistorySearch = ({ onClose }: IProps) => {
  const localHistory = localStorage.getItem('searchHistory');
  const searchHistory = useMemo(() => (localHistory ? JSON.parse(localHistory) : []), [localHistory]);

  const [history, setHistory] = useState(searchHistory);

  const handleClearSearchHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleSetHistory = (historyArr: string[]) => {
    setHistory(historyArr);
  };

  useEffect(() => {
    setHistory(searchHistory);
  }, [searchHistory, history, localHistory]);

  if (history?.length === 0) {
    return null;
  }

  return (
    <SearchWrapper>
      <div className={styles.top}>
        <div className={styles.title}>
          История
        </div>
        <button
          className={styles.clear}
          type="button"
          onClick={handleClearSearchHistory}
        >
          Очистить
        </button>
      </div>
      <div className={styles.bot}>
        <ArrayRender
          items={history.slice(0, 5)}
          renderItem={(item: string) => (
            <Link
              href={createSearchLink(item)}
              onClick={onClose}
              className={styles.link}
              key={item}
            >
              <HistorySearchItem
                value={item}
                key={item}
                history={history}
                setHistory={handleSetHistory}
                onClose={onClose}
              />
            </Link>
          )}
        />
      </div>
    </SearchWrapper>
  );
};
