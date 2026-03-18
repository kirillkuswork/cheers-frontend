import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import {
  IProductAttributesResult,
  IProductCardFormProps,
} from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';

import { SelectInput } from '@/shareds/ui/SelectInput';
import { MultiSelect } from '@/shareds/ui/MultiSelect';
import { attributeEnumObject } from '@/admin/sections/Management/ProductManagement/ProductCardForm/consts';
import styles from './styles.module.scss';

interface IMainInformationForm extends IProductCardFormProps {
  selectStates: IProductAttributesResult;
  loadMoreAttributes: (key: keyof typeof attributeEnumObject) => void;
  handleSearch: (
    key: keyof typeof attributeEnumObject,
    query: string | null,
  ) => void;
  isAttributesFetching?: boolean
}

export const MainInformationForm: FC<IMainInformationForm> = ({
  control,
  errors,
  values,
  selectStates,
  loadMoreAttributes,
  handleSearch,
  isAttributesFetching,
}) => {
  const isVine = values?.type?.value === 'Вино';

  return (
    <FormSectionWrapper
      title="Основная информация"
      childrenClassName={styles.wrapper}
    >
      <Controller
        name="year"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <MainInput
            {...field}
            showClearButton
            type="number"
            label="Год"
            error={!!errors.year}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="volume"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <SelectInput
            className={styles.productType}
            {...field}
            options={selectStates?.volume?.values}
            value={field?.value?.value}
            label="Объем"
            error={!!errors.volume}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="abv"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <MainInput
            {...field}
            showClearButton
            label="Крепость"
            type="number"
            error={!!errors.abv}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="materials"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <SelectInput
            className={styles.productType}
            {...field}
            options={selectStates?.materials?.values}
            value={field?.value?.value}
            label="Материал"
            error={!!errors.materials}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      {!!values?.type?.value && (
      <Controller
        name="gastronomy"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <MultiSelect
            {...field}
            options={selectStates?.gastronomy?.values}
            onChange={(item) => field.onChange(item)}
            label="Гастрономия"
          />
        )}
      />
      )}
      {isVine && (
        <Controller
          name="grapes"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <MultiSelect
              {...field}
              isFetching={isAttributesFetching}
              isSearch
              options={selectStates?.grapes?.values}
              fetchMoreData={() => loadMoreAttributes('grapes')}
              onSearch={(query) => handleSearch('grapes', query)}
              label="Сорт винограда"
              error={!!errors.grapes}
              errorMsg="Обязательно к заполнению"
            />
          )}
        />
      )}
      <Controller
        name="sub_type"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <SelectInput
            className={styles.productType}
            {...field}
            options={selectStates?.sub_type?.values}
            value={field?.value?.value}
            label="Подтип товара"
            error={!!errors.sub_type}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      {isVine && (
        <Controller
          name="sweetness"
          control={control}
          rules={{
            required: isVine,
          }}
          render={({ field }) => (
            <SelectInput
              className={styles.productType}
              {...field}
              options={selectStates?.sweetness?.values}
              value={field?.value?.value}
              label="Сладость"
              error={!!errors.sweetness}
              errorMsg="Обязательно к заполнению"
            />
          )}
        />
      )}
      <Controller
        name="color"
        control={control}
        rules={{
          required: isVine,
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            options={selectStates?.color?.values}
            className={styles.productType}
            value={field?.value?.value}
            label="Цвет"
            error={!!errors.color}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <SelectInput
            isFetching={isAttributesFetching}
            className={styles.productType}
            {...field}
            isSearch
            options={selectStates?.country?.values}
            fetchMoreData={() => loadMoreAttributes('country')}
            onSearch={(query) => handleSearch('country', query)}
            value={field?.value?.value}
            label="Страна"
            error={!!errors.country}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
      <Controller
        name="region"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <SelectInput
            isFetching={isAttributesFetching}
            className={styles.productType}
            {...field}
            isSearch
            options={selectStates?.region?.values}
            fetchMoreData={() => loadMoreAttributes('region')}
            onSearch={(query) => handleSearch('region', query)}
            onChange={(item) => field.onChange(item)}
            value={field.value?.value}
            label="Регион"
            error={!!errors.region}
            errorMsg="Обязательно к заполнению"
          />
        )}
      />
    </FormSectionWrapper>
  );
};
