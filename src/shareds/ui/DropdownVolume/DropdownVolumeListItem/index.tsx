/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  useCallback,
} from 'react';
import clsx from 'clsx';
import { IVolume } from '@/redux/services/types/products';
import styles from './styles.module.scss';
import { IDropdownVolumeListItemProps } from './types';

export const DropdownVolumeListItem = ({
  listItem,
  setSelectedOption,
  selectedOption,
  setIsOpen,
}: IDropdownVolumeListItemProps) => {
  const { id, volume } = listItem;

  const handleItemClick = useCallback(
    (item: IVolume) => {
      setSelectedOption(item);
      setIsOpen(false);
    },
    [setIsOpen, setSelectedOption],
  );

  return (
    <div
      key={id}
      onClick={() => handleItemClick(listItem)}
      className={styles.listItem}
    >
      <span className={clsx(
        selectedOption?.id === id && styles.active,
      )}
      >
        {volume ? `${volume} мл` : 'Не указан'}
      </span>
    </div>
  );
};
