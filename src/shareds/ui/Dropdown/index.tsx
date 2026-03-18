/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC, useCallback, useRef, useState,
} from 'react';
import { ArrowDown } from '@/assets/icons';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { DropDownItem, IDropDownProps } from './types';
import { ArrayRender } from '../../utils/components';

export const Dropdown: FC<IDropDownProps> = ({
  options,
  className,
  setSelectedOption,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback(
    (item: DropDownItem) => {
      setSelectedOption(item);
      setIsOpen(false);
    },
    [setSelectedOption],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutsideClick(dropdownRef, handleClose, isOpen);

  return (
    <div ref={dropdownRef} className={styles.dropdownWrap}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          styles.dropdown,
          isOpen && styles.openedDropdown,
          className,
        )}
      >
        <span>{selectedOption?.label}</span>
        <ArrowDown className={clsx(styles.icon, isOpen && styles.opened)} />
      </div>

      {isOpen && (
        <div className={styles.dropdownList}>
          <ArrayRender
            items={options}
            renderItem={(item) => (
              <div
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={clsx(
                  styles.listItem,
                  selectedOption?.label === item.label && styles.active,
                )}
              >
                {item.label}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};
