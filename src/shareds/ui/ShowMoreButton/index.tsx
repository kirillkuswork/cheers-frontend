import React, { FC } from 'react';
import { Button } from '@/shareds';
import { ArrowDown } from '@/assets/icons';
import { IButtonProps } from '@/shareds/ui/Button';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IShowMoreButtonProps extends IButtonProps {
  label: string;
  showMore: boolean;
}

export const ShowMoreButton: FC<IShowMoreButtonProps> = ({
  label,
  className,
  showMore,
  onClick,
  ...btnAttrs
}) => (
  <Button
    onClick={onClick}
    className={clsx(styles.button, className)}
    icon={<ArrowDown className={clsx(styles.icon, showMore && styles.rotateIcon)} />}
    label={showMore ? 'Скрыть' : label}
    variant="tertiary"
    {...btnAttrs}
  />
);
