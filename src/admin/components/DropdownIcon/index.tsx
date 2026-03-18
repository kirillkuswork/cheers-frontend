/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  ReactNode, useCallback, useRef, useState,
} from 'react';
import clsx from 'clsx';
import { IconButton } from '@/shareds';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import styles from './styles.module.scss';

interface IWrapperProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}
interface IItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: string;
}

const Wrapper: FC<IWrapperProps> = ({
  children,
  icon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    setIsOpen?.(false);
  }, []);
  useOutsideClick(dropdownRef, handleClose, isOpen);

  return (
    <div ref={dropdownRef} className={clsx(styles.dropdown, className)}>
      <div onClick={() => setIsOpen?.(!isOpen)}>
        <IconButton className={styles.iconButton} size="large" icon={icon} />
      </div>
      {isOpen && (
      <div onClick={() => setIsOpen?.(!isOpen)} className={styles.wrapper}>
        {children}
      </div>
      )}
    </div>
  );
};

const Item: FC<IItemProps> = ({
  icon, label, onClick, ...props
}) => (
  <button type="button" onClick={onClick} className={styles.item} {...props}>
    <div className={styles.icon}>{icon}</div>
    <span>{label}</span>
  </button>
);

export const DropdownIcon = {
  Wrapper,
  Item,
};
