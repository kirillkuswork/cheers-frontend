import ModalWrapper from '@/shareds/ui/ModalWrapper';
import React, { FC, useMemo } from 'react';
import { Heading } from '@/admin/components/Modals/AddingProduct/Heading';
import { FindAndCreateProduct } from '@/admin/components/Modals/AddingProduct/FindAndCreateProduct';
import { CreateProductForm } from '@/admin/components/Modals/AddingProduct/CreateProductForm';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { IconButton } from '@/shareds';
import { ArrowLeft } from '@/assets/icons';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

interface IAddingProductModal {
  isOpen: boolean;
  onClose?: () => void;
}

export const AddingProductModal: FC<IAddingProductModal> = ({
  isOpen,
  onClose,
}) => {
  const { isCreatProductModalOpen, selectedBaseCard } = useSelector(selectors.adminSelector);
  const { setCreatProductModalOpen } = useActions(adminActions);

  const descriptionState = useMemo(() => {
    if (isCreatProductModalOpen) {
      return selectedBaseCard?.name ? 'Выберите тип товара' : 'Введите название и выберите тип товара';
    }
    return 'Введите название товара в поисковую строку';
  }, [isCreatProductModalOpen, selectedBaseCard?.name]);

  return (
    <ModalWrapper
      canClose
      isVisible={isOpen}
      className={styles.wrapper}
      onClose={onClose}
    >
      {isCreatProductModalOpen && (
        <IconButton
          className={styles.backButton}
          onClick={() => setCreatProductModalOpen(false)}
          icon={<ArrowLeft />}
          variant="secondary"
        />
      )}
      <Heading title="Добавление товара" description={descriptionState} />
      {!isCreatProductModalOpen ? (
        <FindAndCreateProduct />
      ) : (
        <CreateProductForm />
      )}
    </ModalWrapper>
  );
};
