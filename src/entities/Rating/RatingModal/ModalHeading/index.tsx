import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  text: string;
}

export const ModalHeading: FC<IProps> = ({ text }) => (
  <div className={styles.wrapper}>
    {text}
  </div>
);
