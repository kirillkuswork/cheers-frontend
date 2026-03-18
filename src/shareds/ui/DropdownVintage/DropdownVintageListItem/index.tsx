/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC,
  useCallback,
} from 'react';
import { Expert, Star } from '@/assets/icons';
import clsx from 'clsx';
import { IOption } from '@/entities/Product/MainSectionInfo/types';
import styles from './styles.module.scss';
import { IDropdownVintageListItemProps } from './types';
import { ProductCardRate } from '../../ProductCardRate';

export const DropdownVintageListItem: FC<IDropdownVintageListItemProps> = ({
  listItem,
  setSelectedOption,
  selectedOption,
  setIsOpen,
}) => {
  const { label, ratingExpert, ratingCustomer } = listItem;

  const handleItemClick = useCallback(
    (item: IOption) => {
      setSelectedOption(item);
      setIsOpen(false);
    },
    [setIsOpen, setSelectedOption],
  );

  return (
    <div
      key={label}
      onClick={() => handleItemClick(listItem)}
      className={styles.listItem}
    >
      <span className={clsx(
        selectedOption?.label === label && styles.active,
      )}
      >
        {label}
      </span>
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
  );
};
