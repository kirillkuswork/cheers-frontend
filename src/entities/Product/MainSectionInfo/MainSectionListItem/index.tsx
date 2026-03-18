import React, {
  FC,
} from 'react';
import styles from './styles.module.scss';

interface IProps {
  title: string;
  description: string | undefined;
}

export const MainSectionListItem: FC<IProps> = ({
  title,
  description,
}: IProps) => (
  <div className={styles.descItem}>
    <span className={styles.title}>{`${title}:`}</span>
    <span className={styles.description}>
      {description}
      {title === 'Объем' && ' мл.'}
    </span>
  </div>
);
