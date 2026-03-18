/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import {
  IProductAttributesResult,
  IProductCardFormProps,
} from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { SelectInput } from '@/shareds/ui/SelectInput';
import { Hint } from '@/admin/assets/icons';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { CustomTooltip } from '@/shareds/ui/CustomTooltip';

import styles from './styles.module.scss';

interface IProductNameForm extends IProductCardFormProps {
  selectStates?: IProductAttributesResult;
}

export const ProductNameForm: FC<IProductNameForm> = ({
  control,
  errors,
  selectStates,
  baseCard,
}) => (
  <FormSectionWrapper childrenClassName={styles.wrapper}>
    <div className={styles.row}>
      <Controller
        name="productName"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <MainInput
            {...field}
            disabled={baseCard}
            showClearButton
            label="Наименование товара"
            error={!!errors.productName}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="type"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <SelectInput
            className={styles.productType}
            {...field}
            onChange={(item) => field.onChange(item)}
            value={field?.value?.value}
            label="Тип товара"
            options={selectStates?.type?.values}
            error={!!errors.type}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
    </div>
    <div className={styles.row}>
      <Controller
        name="prefix"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <MainInput
            icon={(
              <CustomTooltip title="Префикс отображается перед названием товара. Например: 'Красное вино'" isInverted>
                <Hint />
              </CustomTooltip>
              )}
            {...field}
            showClearButton
            label="Префикс"
          />
        )}
      />
      <Controller
        name="suffix"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <MainInput
            icon={(
              <CustomTooltip title="Суффикс отображается после названия товара. Например: '0.75л, подарочная упаковка'" isInverted>
                <Hint />
              </CustomTooltip>
              )}
            {...field}
            showClearButton
            label="Суффикс"
          />
        )}
      />
    </div>
  </FormSectionWrapper>
);
