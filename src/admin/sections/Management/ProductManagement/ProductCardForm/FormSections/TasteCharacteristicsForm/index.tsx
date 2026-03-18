import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { handleNumericInputChange } from '@/helpres/handleNumericInputChange';
import styles from './styles.module.scss';

export const TasteCharacteristicsForm: FC<IProductCardFormProps> = ({
  control,
}) => (
  <FormSectionWrapper
    title="Вкусовые характеристики"
    childrenClassName={styles.wrapper}
  >
    <Controller
      name="bodied_level"
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
      name="sweetness_level"
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
      name="tannin_level"
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
      name="acidity_level"
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
      name="fizziness_level"
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
  </FormSectionWrapper>
);
