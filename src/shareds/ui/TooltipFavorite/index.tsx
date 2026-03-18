/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC, useRef,
} from 'react';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import clsx from 'clsx';
import { Corner } from '@/shareds/assets/icons';
import styles from './styles.module.scss';
import { CustomTooltip } from '../CustomTooltip';
import Button from '../Button';

interface IProps {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const TooltipFavorite: FC<IProps> = ({
  className,
  isOpen,
  onClick,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, onClose, isOpen);

  return (
    <>
      {isOpen && (
        <div ref={dropdownRef}>
          <CustomTooltip className={clsx(styles.tooltip, className)}>
            <div className={styles.tooltip__title}>
              В избранном
            </div>
            <div className={styles.tooltip__subtitle}>
              Войдите, чтобы сохранить избранные товары в аккаунте
            </div>
            <Button
              label="Войти"
              variant="secondary"
              className={styles.tooltip__button}
              size="small"
              onClick={onClick}
            />
            <Corner className={styles.corner} />
          </CustomTooltip>
        </div>
      )}
    </>
  );
};
