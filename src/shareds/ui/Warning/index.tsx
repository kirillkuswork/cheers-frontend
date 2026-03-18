import { FC, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import {
  Success, Error, Info, Attention,
} from '@/assets/icons';
import styles from './styles.module.scss';

interface IWarningProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  status?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
}

export const Warning: FC<IWarningProps> = ({
  children,
  status = 'info',
  title,
  className,
}) => {
  const statuses = {
    success: { icon: <Success />, style: styles.success },
    error: { icon: <Error />, style: styles.error },
    info: { icon: <Info />, style: styles.info },
    warning: { icon: <Attention />, style: styles.warning },
  };

  return (
    <div className={clsx(styles.wrapper, statuses[status].style, className)}>
      <span className={styles.icon}>{statuses[status].icon}</span>
      <div className={clsx(styles.content, title && styles.withTitle)}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.description}>{children}</span>
      </div>
    </div>
  );
};
