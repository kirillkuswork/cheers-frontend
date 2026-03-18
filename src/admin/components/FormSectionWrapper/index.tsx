import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IFormSectionWrapper extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  childrenClassName?: string
}

export const FormSectionWrapper: FC<IFormSectionWrapper> = ({
  children,
  className,
  title,
  description,
  childrenClassName,
}) => (
  <div className={clsx(styles.wrapper, className)}>
    {title && (
    <div className={styles.text}>
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
    </div>
    )}
    <div className={childrenClassName}>{children}</div>
  </div>
);
