/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useEffect } from 'react';
import { ISteps } from '@/widgets/Header/AuthModal/types';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import styles from '@/widgets/Header/AuthModal/styles.module.scss';
import { ModalHeader } from '@/widgets/Header/AuthModal/ModalHeader';
import { MainInput } from '@/shareds/ui/MainInput';
import { Button } from '@/shareds';
import { useSelector } from 'react-redux';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { useLazyGetOtpQuery } from '@/redux/services/authApi';

interface IFirstStep extends Pick<ISteps, 'setSteps'> {}

export const FirstStep: FC<IFirstStep> = ({ setSteps }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOtpSuccess } = useSelector(authSelectors);
  const [getOtp, { isFetching: isOtpLoading }] = useLazyGetOtpQuery();

  const formatPhoneNumber = (value: string) => value.replace(/\D/g, '').replace(/^8/, '7');

  const onSubmit = (formData: FieldValues) => {
    const formattedData = {
      ...formData,
      phone: formatPhoneNumber(formData.phone),
    };
    getOtp?.(formattedData);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.code === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    if (isOtpSuccess) {
      setSteps(2);
    }
  }, [isOtpSuccess, setSteps]);

  return (
    <div className={styles.stepWrapper}>
      <ModalHeader
        title="Введите номер телефона"
        description="Мы пришлем вам SMS сообщение с кодом"
      />
      <form onKeyDown={handleKeyDown}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true, minLength: 14 }}
          render={({ field }) => (
            <MainInput
              {...field}
              autoFocus
              required
              mask="+7 999 9999999"
              label="Номер телефона"
              error={!!errors.phone}
              errorMsg="Чтобы продолжить, укажите номер телефона"
            />
          )}
        />
      </form>

      <Button
        disabled={isOtpLoading}
        isLoading={isOtpLoading}
        onClick={handleSubmit(onSubmit)}
        size="large"
        label="Далее"
      />
    </div>
  );
};
