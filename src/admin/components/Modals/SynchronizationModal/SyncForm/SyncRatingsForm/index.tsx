import React, { FC } from 'react';
import { MainInput } from '@/shareds/ui/MainInput';
import { Controller } from 'react-hook-form';
import { ISyncFormType } from '@/admin/components/Modals/SynchronizationModal/types';
import styles from '../styles.module.scss';

interface ISyncRatingsFormProps extends Pick<ISyncFormType, 'control'> {}

export const SyncRatingsForm:FC<ISyncRatingsFormProps> = ({ control }) => (
  <div className={styles.row}>
    <Controller
      name="sync_vivino_rating"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          containerClassName={styles.textField}
          {...field}
          showClearButton
          type="number"
          label="Рейтинг Vivino"
        />
      )}
    />
    <Controller
      name="sync_world_place"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          containerClassName={styles.textField}
          {...field}
          showClearButton
          type="number"
          label="Место в мире"
        />
      )}
    />
    <Controller
      name="sync_region_place"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          containerClassName={styles.textField}
          {...field}
          showClearButton
          type="number"
          label="Место в регионе"
        />
      )}
    />
    <Controller
      name="sync_vineyard_place"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          type="number"
          label="Место среди вин виноградника"
        />
      )}
    />
  </div>
);
