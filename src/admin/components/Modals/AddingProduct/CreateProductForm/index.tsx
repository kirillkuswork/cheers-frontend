import React, { FC, useEffect } from 'react';
import { Button, ButtonStack } from '@/shareds';
import { MainInput } from '@/shareds/ui/MainInput';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { adminSelector } from '@/redux/selectors/adminSelectors';
import { useGetAdminProductAttributesQuery } from '@/redux/services/adminApi';
import { SelectInput } from '@/shareds/ui/SelectInput';
import styles from './styles.module.scss';

interface ICreateProductForm {}

export const CreateProductForm: FC<ICreateProductForm> = () => {
  const router = useRouter();
  const {
    setCreatProductModalOpen,
    setAddingModalOpen,
    setSelectedProductValues,
  } = useActions(adminActions);
  const { selectedBaseCard, productAttributes } = useSelector(adminSelector);

  const onAddingModalCloseHandler = () => {
    setCreatProductModalOpen(false);
    setAddingModalOpen(false);
  };

  const { isFetching } = useGetAdminProductAttributesQuery({
    attributeId: 1,
    pagination: { cursor: null, limit: 20 },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setAddingModalOpen(false);
    setCreatProductModalOpen(false);
    if (selectedBaseCard?.name) {
      router.push('/admin/products/new?type=base');
    } else {
      router.push('/admin/products/new');
    }
  };

  useEffect(() => {
    if (selectedBaseCard) {
      setValue('productName', selectedBaseCard?.name);
    }
  }, [setSelectedProductValues, selectedBaseCard, setValue]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Controller
          name="productName"
          control={control}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 300,
          }}
          render={({ field }) => (
            <MainInput
              disabled={!!selectedBaseCard?.name}
              {...field}
              onChange={(event) => {
                const { value } = event.target;
                if (value.length <= 300) {
                  field.onChange(event);
                  setSelectedProductValues({ name: value });
                }
              }}
              showClearButton={!selectedBaseCard?.name}
              type="text"
              label="Наименование товара"
              error={!!errors.productName}
              errorMsg="Слишком короткое название. Минимум 3 символа"
            />
          )}
        />
        <Controller
          name="productType"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <SelectInput
              {...field}
              isLoading={isFetching}
              label="Тип товара"
              options={productAttributes?.values}
              error={!!errors.productType}
              errorMsg="Поле не должно оставаться пустым"
              value={field?.value?.value}
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                setSelectedProductValues(selectedOption);
              }}
            />
          )}
        />
      </form>
      <ButtonStack className={styles.buttonStack}>
        <Button
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
          onClick={onAddingModalCloseHandler}
        />
        <Button
          className={styles.button}
          label="Добавить"
          size="large"
          onClick={handleSubmit(onSubmit)}
        />
      </ButtonStack>
    </div>
  );
};
