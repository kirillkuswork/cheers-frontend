import React, { ReactNode } from 'react';
import { Button } from '@/shareds';
import { Plus } from '@/assets/icons';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { AddingProductModal } from '@/admin/components/Modals/AddingProduct';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import styles from './styles.module.scss';

interface IProps {
  title?: string;
  children: ReactNode;
}

export const PageWrapper = ({ title, children }: IProps) => {
  const { setAddingModalOpen, setCreatProductModalOpen } = useActions(adminActions);
  const { isAddingModalOpen } = useSelector(selectors.adminSelector);
  const onAddingModalCloseHandler = () => {
    setCreatProductModalOpen(false);
    setAddingModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.heading}>
          {title && <div className={styles.title}>{title}</div>}
          <Button
            onClick={() => setAddingModalOpen(true)}
            label="Добавить товар"
            variant="secondary"
            icon={<Plus className={styles.icon} />}
          />
        </div>
      )}
      <div className={styles.inner}>{children}</div>

      <AddingProductModal
        isOpen={isAddingModalOpen}
        onClose={onAddingModalCloseHandler}
      />
    </div>
  );
};
