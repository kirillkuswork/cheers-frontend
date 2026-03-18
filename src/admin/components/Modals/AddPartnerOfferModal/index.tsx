/* eslint-disable react-hooks/exhaustive-deps */
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Heading } from '@/admin/components/Modals/AddingProduct/Heading';
import { Button, ButtonStack } from '@/shareds';
import { Controller, useForm } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import { SelectInput } from '@/shareds/ui/SelectInput';
import { MultiSelect } from '@/shareds/ui/MultiSelect';
import { IAdminProductAttribute } from '@/redux/services/types/admin';
import {
  useCreateAdminOfferMutation,
  useLazyGetAdminOfficesQuery,
  useLazyGetAdminPartnersQuery,
} from '@/redux/services/adminApi';
import { useRouter } from 'next/router';

import { offerForm } from '@/admin/components/Modals/AddPartnerOfferModal/offerForm';
import { ConfigProvider } from 'antd/lib';
import { CustomDatePicker } from '@/shareds/ui/CustomDatePicker/CustomDatePicker';
import ruRU from 'antd/lib/locale/ru_RU';
import styles from './styles.module.scss';

interface IAddPartnerOfferModal {
  isOpen: boolean;
  onClose?: () => void;
}

export const AddPartnerOfferModal: FC<IAddPartnerOfferModal> = ({
  isOpen,
  onClose,
}) => {
  const [getPartners, { data: partnersData }] = useLazyGetAdminPartnersQuery();
  const [getOffices, { data: officesData, isFetching: isOfficesLoading }] = useLazyGetAdminOfficesQuery();
  const [createOffer, { isLoading }] = useCreateAdminOfferMutation();

  const [partnerId, setPartnerId] = useState<number | null>(null);

  const router = useRouter();
  const id = router?.query?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({ mode: 'onChange' });

  const price = watch('price', '');
  const discountPrice = watch('discount_price', '');

  useEffect(() => {
    if (price === '') {
      setValue('discount_percent', '');
      setValue('discount_price', '');
    } else if (discountPrice === '') {
      setValue('discount_percent', '');
    } else {
      const calculatedDiscountPercent = ((price - discountPrice) / price) * 100;
      setValue('discount_percent', calculatedDiscountPercent.toFixed(0));
    }
  }, [price, discountPrice, setValue]);

  const handleDiscountPriceChange = (value: string) => {
    const newPrice = Number(value);

    if (Number.isNaN(newPrice)) {
      setValue('discount_price', '');
      setValue('discount_percent', '');
    } else if (newPrice > price) {
      setValue('discount_price', price);
    } else {
      setValue('discount_price', value);
    }
  };

  const onCloseHandler = () => {
    reset();
    onClose?.();
  };

  const partnersOptions = useMemo(
    () => partnersData?.partners.map((item) => ({
      id: item.id,
      value: item.name,
    })) as unknown as IAdminProductAttribute[],
    [partnersData?.partners],
  );

  const officesOptions = useMemo(
    () => officesData?.offices.map((item) => ({
      id: item.id,
      value: item.address,
    })) as unknown as IAdminProductAttribute[],
    [officesData?.offices],
  );

  useEffect(() => {
    getPartners({
      product_id: Number(id),
      pagination: {
        cursor: null,
        limit: 20,
      },
    });
  }, []);

  useEffect(() => {
    if (partnerId) {
      getOffices({
        partnerId,
        pagination: {
          cursor: null,
          limit: 20,
        },
      });
    }
  }, [partnerId]);

  const onSubmit = handleSubmit(async (formData) => {
    const requestForm = offerForm({ data: formData, productId: Number(id), partnerId: partnerId! });

    await createOffer(requestForm).then((res) => {
      if (res.data) {
        onClose?.();
      }
    });
  });

  return (
    <ModalWrapper
      canClose
      isVisible={isOpen}
      className={styles.wrapper}
      onClose={onCloseHandler}
    >
      <Heading title="Добавить предложение партнера" />
      <form className={styles.form}>
        <div className={styles.row}>
          <Controller
            name="partnerName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <SelectInput
                className={styles.name}
                {...field}
                onChange={(item) => {
                  field.onChange(item.value);
                  setPartnerId(item.id!);
                }}
                label="Наименование партнера"
                options={partnersOptions}
                error={!!errors.partnerName}
                errorMsg="Поле не должно оставаться пустым"
              />
            )}
          />
          <Controller
            name="shops"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <MultiSelect
                {...field}
                disabled={!partnerId}
                isLoading={isOfficesLoading}
                label="Магазины"
                value={field.value || []}
                onChange={(item) => field.onChange(item)}
                options={officesOptions}
                error={!!errors.shops}
                errorMsg="Поле не должно оставаться пустым"
              />
            )}
          />
        </div>
        <div className={styles.row}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <MainInput
                {...field}
                containerClassName={styles.price}
                showClearButton
                type="number"
                label="Цена, руб."
                error={!!errors.price}
                errorMsg="Поле не должно оставаться пустым"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (e.target.value === '') {
                    setValue('discount_percent', '');
                    setValue('discount_price', '');
                  }
                }}
              />
            )}
          />
          <Controller
            name="discount_price"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <MainInput
                {...field}
                containerClassName={styles.price}
                showClearButton
                type="number"
                label="Новая цена"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleDiscountPriceChange(e.target.value);
                  if (e.target.value === '') {
                    setValue('discount_percent', '');
                  }
                }}
                error={!!errors.discount_price}
                errorMsg="Поле не должно оставаться пустым"
              />
            )}
          />
          <Controller
            name="discount_percent"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <MainInput
                containerClassName={styles.price}
                {...field}
                disabled
                type="number"
                label="Скидка, %"
              />
            )}
          />
          <Controller
            name="partner_product_id"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <MainInput
                {...field}
                showClearButton
                type="number"
                label="Идентификатор товара в каталоге партнёра"
                error={!!errors.partner_product_id}
                errorMsg="Обязательно к заполнению"
              />
            )}
          />
        </div>
        <ConfigProvider locale={ruRU}>
          <div className={styles.row}>
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  value={field.value}
                  onChange={(item) => {
                    field.onChange(item);
                  }}
                  label="Дата начала предложения"
                  error={!!errors.startDate}
                  errorMsg="Поле не должно оставаться пустым"
                  containerClassName={styles.date}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  value={field.value}
                  onChange={(item) => {
                    field.onChange(item);
                  }}
                  label="Дата окончания предложения"
                  error={!!errors.endDate}
                  errorMsg="Поле не должно оставаться пустым"
                  containerClassName={styles.date}
                />
              )}
            />
            <Controller
              name="productLink"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <MainInput
                  {...field}
                  showClearButton
                  type="text"
                  label="Ссылка на товар с сайта партнера"
                />
              )}
            />
          </div>
        </ConfigProvider>
      </form>

      <ButtonStack className={styles.buttonStack}>
        <Button
          disabled={isLoading}
          onClick={onClose}
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={onSubmit}
          className={styles.button}
          label="Добавить"
          size="large"
        />
      </ButtonStack>
    </ModalWrapper>
  );
};
