import React, { FC, useState } from 'react';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { Button } from '@/shareds';
import { useLazyGetSyncWithVivinoQuery } from '@/redux/services/adminApi';
import { SynchronizationModal } from '@/admin/components/Modals/SynchronizationModal';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { VivinoIdInput } from '@/admin/sections/Management/ProductManagement/ProductCardForm/FormSections/VivinoIdInput';
import { IVivinoSyncRequest } from '@/redux/services/types/admin';
import { formatToDDMMYY } from '@/helpres/formatTime';
import styles from './styles.module.scss';

export interface ISynchronizationForm extends IProductCardFormProps {}

export const SynchronizationForm: FC<ISynchronizationForm> = ({
  control,
  values,
  setValue,
}) => {
  const { setIsSyncError, setIsVivinoIdError, setVivinoId } = useActions(adminActions);
  const { vivinoId } = useSelector(selectors.adminSelector);
  const [openSyncModal, setOpenSyncModal] = useState<boolean>(false);

  const [getSyncWithVivino, { isFetching }] = useLazyGetSyncWithVivinoQuery();

  const syncWithVivinoHandler = (params: IVivinoSyncRequest) => {
    if (!vivinoId) {
      setIsVivinoIdError(true);
      return;
    }
    getSyncWithVivino(params).then((res) => {
      if (res?.data) {
        setValue?.('vivino_id', params.vivino_id);
        setVivinoId(params.vivino_id);
        setIsSyncError(false);
        setOpenSyncModal(true);
      } else if (res.error) {
        setIsSyncError(true);
        setOpenSyncModal(true);
        setVivinoId(params.vivino_id);
      }
    });
  };

  return (
    <FormSectionWrapper
      title="Синхронизация с Vivino"
      description="Чтобы получить корректный рейтинг, не забудьте указать винтаж"
      childrenClassName={styles.wrapper}
    >
      <VivinoIdInput control={control} />
      <div className={styles.buttonWrapper}>
        <Button
          disabled={isFetching}
          isLoading={isFetching}
          onClick={() => syncWithVivinoHandler({ vivino_id: vivinoId!, year: Number(values?.year) })}
          label={values?.synchronized_at ? 'Обновить' : 'Синхронизировать'}
          variant="secondary"
          size="large"
          className={styles.button}
        />
        {!!values?.synchronized_at && (
        <span className={styles.syncDate}>
          {`Синхронизированно ${formatToDDMMYY(values?.synchronized_at)}`}
        </span>
        )}
      </div>

      {openSyncModal && (
        <SynchronizationModal
          isFetching={isFetching}
          isOpen={openSyncModal}
          onClose={() => setOpenSyncModal(false)}
          syncWithVivinoHandler={syncWithVivinoHandler}
          values={values}
        />
      )}
    </FormSectionWrapper>
  );
};
