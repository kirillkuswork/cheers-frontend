/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { CrossIcn } from '@/shareds/assets/icons';
import { IconButton } from '@/shareds/ui/IconButton';
import { MouseEvent } from 'react';
import styles from './styles.module.scss';

interface IProps {
  value: string;
  history: string[];
  setHistory: (param: string[]) => void;
  onClose: () => void;
}

export const HistorySearchItem = ({
  value,
  history,
  setHistory,
  onClose,
}: IProps) => {
  const handleDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const filteredHistory = history?.filter((item: string) => item !== value);
    const newHistory = JSON.stringify(filteredHistory);
    setHistory(filteredHistory);
    localStorage.setItem('searchHistory', newHistory);
  };

  const handleClick = () => {
    const historyLocal = localStorage.getItem('searchHistory');
    const historyParse = historyLocal ? JSON.parse(historyLocal) : [];
    const newHistory = [value, ...historyParse.filter((item: string) => item !== value)];
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    onClose();
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleClick}
    >
      <span className={styles.text}>
        {value}
      </span>
      <IconButton
        className={styles.delete}
        icon={<CrossIcn />}
        onClick={(e) => handleDelete(e)}
      />
    </div>
  );
};
