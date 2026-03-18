import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonStack } from '@/shareds';
import { SyncProducerForm } from '@/admin/components/Modals/SynchronizationModal/SyncForm/SyncProducerForm';
import { SyncTasteCharacteristicsForm } from '@/admin/components/Modals/SynchronizationModal/SyncForm/SyncTasteCharacteristicsForm';
import { SyncRatingsForm } from '@/admin/components/Modals/SynchronizationModal/SyncForm/SyncRatingsForm';
import { SyncTasteNotesForm } from '@/admin/components/Modals/SynchronizationModal/SyncForm/SyncTasteNotesForm';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import {
  syncModalReceivedFormData,
  syncModalResetFormData,
} from '@/admin/sections/Management/ProductManagement/ProductCardForm/helpers/syncModalFormData';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

interface ISyncFormProps {
  onClose?: () => void;
}

export const SyncForm:FC<ISyncFormProps> = ({ onClose }) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = useForm();

  const { vivinoData } = useSelector(selectors.adminSelector);
  const { setSynchronizedData } = useActions(adminActions);

  const data = getValues();

  useEffect(() => {
    reset(syncModalReceivedFormData(vivinoData));
  }, [reset, vivinoData]);

  const onSubmit = handleSubmit(async (formData) => {
    setSynchronizedData(syncModalResetFormData(formData));
    onClose?.();
  });
  return (
    <form className={styles.form}>
      <SyncProducerForm control={control} errors={errors} />
      <SyncRatingsForm control={control} />
      <SyncTasteCharacteristicsForm control={control} />
      <SyncTasteNotesForm control={control} setValue={setValue} values={data} />

      <ButtonStack>
        <Button
          onClick={onClose}
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
        />
        <Button onClick={onSubmit} className={styles.button} label="Синхронизировать" size="large" />
      </ButtonStack>
    </form>
  );
};
