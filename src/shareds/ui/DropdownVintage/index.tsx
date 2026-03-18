/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC, useCallback, useRef, useState,
} from 'react';
import { ArrowDown } from '@/assets/icons';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import clsx from 'clsx';
import Link from 'next/link';
import { PATHS } from '@/shareds/consts/baseConts';
import styles from './styles.module.scss';
import { IDropDownVintageProps } from './types';
import { ArrayRender } from '../../utils/components';
import { DropdownVintageListItem } from './DropdownVintageListItem';

export const DropdownVintage: FC<IDropDownVintageProps> = ({
  options,
  className,
  setSelectedOption,
  selectedOption,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(dropdownRef, handleClose, isOpen);

  return (
    <div ref={dropdownRef} className={styles.dropdownWrap}>
      <div
        onClick={toggleDropdown}
        className={clsx(
          styles.dropdown,
          isOpen && styles.openedDropdown,
          className,
        )}
      >
        <div className={styles.text}>
          {label && (
            <span className={styles.label}>{label}</span>
          )}
          <span>{selectedOption?.label}</span>
        </div>
        <ArrowDown className={clsx(styles.icon, isOpen && styles.opened)} />
      </div>

      {isOpen && (
        <div className={styles.dropdownList}>
          <ArrayRender
            items={options}
            renderItem={(item) => (
              <Link key={item.value} href={`${PATHS.products}/${item.volumes[0].id}`}>
                <DropdownVintageListItem
                  listItem={item}
                  setSelectedOption={setSelectedOption}
                  selectedOption={selectedOption}
                  setIsOpen={setIsOpen}
                />
              </Link>
            )}
          />
        </div>
      )}
    </div>
  );
};
