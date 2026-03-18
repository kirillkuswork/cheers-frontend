/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { ISteps } from '@/widgets/Header/AuthModal/types';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import styles from '@/widgets/Header/AuthModal/styles.module.scss';
import { ModalHeader } from '@/widgets/Header/AuthModal/ModalHeader';
import { MainInput } from '@/shareds/ui/MainInput';
import { Button, CheckBox } from '@/shareds';
import { useLazyGetUserQuery, useLazyUpdateUserQuery } from '@/redux/services/userApi';
import { useLazyRefreshTokenQuery } from '@/redux/services/authApi';
import { useActions } from '@/shareds/hooks/useActions';
import { authActions } from '@/redux/actions/authActions';

interface IThirdStep extends Pick<ISteps, 'setSteps' | 'onClose'> {}

export const ThirdStep: FC<IThirdStep> = ({ onClose, setSteps }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [getUser] = useLazyGetUserQuery();
  const [updateUser, { isSuccess, isFetching }] = useLazyUpdateUserQuery();
  const [
    refreshToken,
    { isSuccess: isRefreshTokenSuccess, isFetching: isRefreshTokenLoading },
  ] = useLazyRefreshTokenQuery();
  const refreshTokenState = localStorage.getItem('refreshToken');
  const { setOtpSuccess } = useActions(authActions);
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/[^A-Za-zА-Яа-яЁё\s]+/g, '');
  };

  const onSubmit = (data: FieldValues) => {
    if (data) {
      updateUser({ name: data.name as unknown as string });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refreshToken?.({ refresh_token: refreshTokenState });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isRefreshTokenSuccess) {
      setOtpSuccess(false);
      getUser();
      setSteps(1);
      onClose?.();
    }
  }, [isRefreshTokenSuccess]);

  return (
    <div className={styles.stepWrapper}>
      <ModalHeader title="Заполните профиль" />
      <form className={styles.stepWrapper}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MainInput
              {...field}
              autoFocus
              required
              type="text"
              label="Ваше имя"
              error={!!errors.name}
              errorMsg="Чтобы продолжить, укажите имя"
              onInput={handleInput}
            />
          )}
        />
        <div className={styles.checkboxGroup}>
          <Controller
            name="consentData"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value: checked },
              fieldState: { error },
            }) => (
              <CheckBox
                value="consentData"
                checked={checked}
                onChange={(val, isChecked) => onChange(isChecked)}
                label="Согласие на обработку персональных данных"
                error={!!error}
              />
            )}
          />
          <Controller
            name="consentRules"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value: checked },
              fieldState: { error },
            }) => (
              <CheckBox
                value="consentRules"
                checked={checked}
                onChange={(val, isChecked) => onChange(isChecked)}
                label="Согласие с правилами сервиса"
                error={!!error}
              />
            )}
          />
        </div>
      </form>
      <Button
        disabled={isFetching || isRefreshTokenLoading}
        isLoading={isFetching}
        onClick={handleSubmit(onSubmit)}
        size="large"
        label="Далее"
      />
    </div>
  );
};
