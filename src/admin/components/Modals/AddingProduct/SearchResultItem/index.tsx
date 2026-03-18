import React, { FC } from 'react';

import { Button } from '@/shareds';
import { ISelectedBaseCard } from '@/redux/services/types/admin';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

export const SearchResultItem: FC<ISelectedBaseCard> = ({ name, id }) => {
  const { setSelectedBaseCard, setCreatProductModalOpen } = useActions(adminActions);

  const onCLickHandler = () => {
    setSelectedBaseCard({ name, id });
    setCreatProductModalOpen(true);
  };

  return (
    <div className={styles.item}>
      <span className={styles.title}>{name}</span>
      <Button
        onClick={onCLickHandler}
        className={styles.button}
        label="Добавить"
        variant="tertiary"
      />
    </div>
  );
};
