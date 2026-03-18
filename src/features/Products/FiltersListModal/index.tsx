/* eslint-disable react/display-name */
import {
  FC, memo, useEffect,
} from 'react';
import { Portal } from '@/shareds/utils/components';
import { Button, ButtonsGroup, IconButton } from '@/shareds';
import { CrossIcn } from '@/assets/icons';
import styles from './styles.module.scss';
import { IFiltersListModalProps } from './types';

export const FiltersListModal: FC<IFiltersListModalProps> = memo(
  ({
    handleCloseModal, isModalOpen, handleSubmit, resetFilters, children,
  }) => {
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 1023) {
          handleCloseModal();
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [handleCloseModal]);

    return (
      <Portal isModalOpen={isModalOpen}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.filterHeader}>
              <span className={styles.title}>Фильтры</span>
              <IconButton
                className={styles.icon}
                onClick={handleCloseModal}
                icon={<CrossIcn />}
              />
            </div>
            <div className={styles.modalList}>{children}</div>
            <div className={styles.filterButtons}>
              <ButtonsGroup>
                <Button
                  size="large"
                  variant="secondary"
                  onClick={handleSubmit}
                  label="Применить"
                />
                <Button
                  size="large"
                  variant="tertiary"
                  label="Очистить фильтр"
                  onClick={resetFilters}
                />
              </ButtonsGroup>
            </div>
          </div>
          <div className={styles.backdrop} />
        </div>
      </Portal>
    );
  },
);
