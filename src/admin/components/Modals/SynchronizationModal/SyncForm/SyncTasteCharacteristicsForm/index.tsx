import React, { FC } from 'react';
import { MainInput } from '@/shareds/ui/MainInput';
import { Controller } from 'react-hook-form';
import { handleNumericInputChange } from '@/helpres/handleNumericInputChange';
import { ISyncFormType } from '@/admin/components/Modals/SynchronizationModal/types';
import styles from '../styles.module.scss';

interface ISyncTasteCharacteristicsFormProps
  extends Pick<ISyncFormType, 'control'> {}

export const SyncTasteCharacteristicsForm: FC<
ISyncTasteCharacteristicsFormProps
> = ({ control }) => (
  <div className={styles.row}>
    <Controller
      name="sync_bodied_level"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          outerLabel="Тело напитка"
          {...field}
          showClearButton
          type="text"
          label="От 0 до 5"
          onChange={(e) => handleNumericInputChange(e, field.onChange)}
        />
      )}
    />

    <Controller
      name="sync_sweetness_level"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          outerLabel="Сладость"
          {...field}
          showClearButton
          type="text"
          label="От 0 до 5"
          onChange={(e) => handleNumericInputChange(e, field.onChange)}
        />
      )}
    />
    <Controller
      name="sync_tannin_level"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          outerLabel="Танинность"
          {...field}
          showClearButton
          type="text"
          label="От 0 до 5"
          onChange={(e) => handleNumericInputChange(e, field.onChange)}
        />
      )}
    />
    <Controller
      name="sync_acidity_level"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          outerLabel="Кислотность"
          {...field}
          showClearButton
          type="text"
          label="От 0 до 5"
          onChange={(e) => handleNumericInputChange(e, field.onChange)}
        />
      )}
    />
    <Controller
      name="sync_fizziness_level"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          outerLabel="Шипучесть"
          {...field}
          showClearButton
          type="text"
          label="От 0 до 5"
          onChange={(e) => handleNumericInputChange(e, field.onChange)}
        />
      )}
    />
  </div>
);
