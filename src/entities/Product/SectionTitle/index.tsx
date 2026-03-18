import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ISectionTitleProps {
  children: ReactNode;
  className?: string;
}

export const SectionTitle: FC<ISectionTitleProps> = ({ children, className }) => <div className={clsx(styles.sectionTitle, className)}>{children}</div>;
