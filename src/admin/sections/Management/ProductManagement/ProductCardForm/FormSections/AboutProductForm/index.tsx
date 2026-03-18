import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { MainTextArea } from '@/shareds';
import styles from './styles.module.scss';

export const AboutProductForm: FC<IProductCardFormProps> = ({
  control,
  values,
}) => (
  <FormSectionWrapper title="О товаре" childrenClassName={styles.wrapper}>
    <Controller
      name="briefInfo"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainTextArea
          {...field}
          showClearButton
          label="О напитке"
        />
      )}
    />
    <Controller
      name="flavour"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          label="Аромат"
        />
      )}
    />
    <Controller
      name="dye"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          label="Цвет"
        />
      )}
    />
    <Controller
      name="taste"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          label="Вкус"
        />
      )}
    />
    <Controller
      name="degustation"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          label="Дегустационные характеристики"
        />
      )}
    />
    <Controller
      name="temperature"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          type="number"
          showClearButton
          label="Рекомендуемая температура хранения"
        />
      )}
    />
    <Controller
      name="style"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          label="Стилистика"
        />
      )}
    />
    <div className={styles.row}>
      {values?.type?.value === 'Вино' && (
      <Controller
        name="vivino_rating"
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
      )}
      <Controller
        name="world_place"
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
        name="region_place"
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
        name="vineyard_place"
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
  </FormSectionWrapper>
);
