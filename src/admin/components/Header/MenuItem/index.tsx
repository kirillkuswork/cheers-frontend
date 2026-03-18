import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface IMenuItem {
  onClick?: () => void;
  text: string;
  icon: ReactNode
}

export const MenuItem:FC<IMenuItem> = ({ onClick, text, icon }) => (
  <button type="button" onClick={onClick} className={styles.item}>
    {icon}
    <span className={styles.text}>{text}</span>
  </button>
);
