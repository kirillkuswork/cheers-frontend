/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { IVivinoSyncRequest } from '@/redux/services/types/admin';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormId } from '@/admin/components/Modals/SynchronizationModal/FormId';
import { SyncForm } from '@/admin/components/Modals/SynchronizationModal/SyncForm';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import ModalScrollWrapper from '@/shareds/ui/ModalScrollWrapper';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';
import { Cards } from './Cards';
import { Heading } from './Heading';

export interface ISynchronizationModal
  extends Pick<IProductCardFormProps, 'values'> {
  isOpen: boolean;
  onClose?: () => void;
  syncWithVivinoHandler: (params: IVivinoSyncRequest) => void;
  isFetching?: boolean;
}

export const SynchronizationModal: FC<ISynchronizationModal> = ({
  isOpen,
  onClose,
  values,
  syncWithVivinoHandler,
  isFetching,
}) => {
  const { isSyncError } = useSelector(selectors.adminSelector);
  const { setVivinoId } = useActions(adminActions);

  const [isNextStep, setIsNextStep] = useState(false);
  const nextStepHandler = useCallback((param: boolean) => {
    setIsNextStep(param);
  }, []);
  const handleOnClose = useCallback(() => {
    setVivinoId(null);
    onClose?.();
  }, [setVivinoId]);

  const renderContent = useMemo(() => {
    if (isSyncError) {
      return (
        <FormId
          year={values?.year}
          isFetching={isFetching}
          syncWithVivinoHandler={syncWithVivinoHandler}
          onClose={handleOnClose}
        />
      );
    }
    if (!isSyncError && !isNextStep) {
      return (
        <Cards nextStepHandler={() => nextStepHandler(true)} values={values} onClose={handleOnClose!} />
      );
    }
    if (!isSyncError && isNextStep) {
      return <SyncForm onClose={handleOnClose} />;
    }
  }, [nextStepHandler, isSyncError, isNextStep, syncWithVivinoHandler]);

  return (
    <ModalScrollWrapper
      canClose
      isVisible={isOpen}
      className={styles.wrapper}
      onClose={handleOnClose}
      canBack={isNextStep}
      onBack={() => setIsNextStep(false)}
    >
      <Heading
        title="Загружаем информацию с Vivino"
        description="Проверьте корректность наименования и характеристики"
      />
      {renderContent}
    </ModalScrollWrapper>
  );
};
