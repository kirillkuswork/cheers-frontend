/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { ISteps } from '@/widgets/Header/AuthModal/types';
import styles from '@/widgets/Header/AuthModal/styles.module.scss';
import { ModalHeader } from '@/widgets/Header/AuthModal/ModalHeader';
import { CodeInput } from '@/widgets/Auth';
import { Loader } from '@/assets/icons';
import { Button, ButtonsGroup } from '@/shareds';
import {
  useLazyGetOtpQuery,
  useLazyLoginQuery,
} from '@/redux/services/authApi';
import { formatTime, formatToHHMM } from '@/helpres/formatTime';
import { useActions } from '@/shareds/hooks/useActions';
import { authActions } from '@/redux/actions/authActions';
import { useSelector } from 'react-redux';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { useLazyGetUserQuery } from '@/redux/services/userApi';

interface ISecondStep extends Pick<ISteps, 'setSteps' | 'onClose'> {}

export const SecondStep: FC<ISecondStep> = ({
  setSteps,
  onClose,
}) => {
  const [getUser] = useLazyGetUserQuery();
  const [getOtp, { isError: isOtpError, isFetching: isOtpLoading }] = useLazyGetOtpQuery();
  const [login, {
    isFetching, isSuccess: isLoginSuccess, isError: isLoginError,
  }] = useLazyLoginQuery();

  const { isOtpSuccess, otpData } = useSelector(authSelectors);
  const {
    phone,
    created,
    created_at: createdAt,
    send_delay: sendDelay,
  } = otpData!;

  const [otpCode, setOtpCode] = useState('');
  const [timeDelay, setTimeDelay] = useState(sendDelay);
  const [trigger, setTrigger] = useState(false);
  const { setOtpSuccess } = useActions(authActions);

  const formattedCountTime = useMemo(() => {
    const end = new Date(createdAt).getTime();
    const now = Date.now();
    return end - now;
  }, [createdAt]);

  const formatPhoneNumber = (phoneNumber: string): string => phoneNumber.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
  const formattedTime = formatToHHMM(new Date(Date.now() + formattedCountTime).toISOString());
  const errorMsg = 'Неверный код проверки';

  const otpOnChangeHandler = (value: string) => {
    setOtpCode(value);
  };

  const onSubmitHandler = () => {
    login?.({ otp_code: otpCode, phone });
  };

  const handleBack = () => {
    setOtpSuccess(false);
    setSteps(1);
  };

  const handleNewOtpRequest = () => {
    setOtpSuccess(false);
    getOtp?.({ phone });
  };

  useEffect(() => {
    if (timeDelay === 0) {
      setTrigger(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeDelay((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeDelay]);

  useEffect(() => {
    if (isOtpSuccess) {
      setTrigger(false);
      setTimeDelay(sendDelay);
    }
  }, [isOtpSuccess]);

  useEffect(() => {
    if (otpCode.length === 4) {
      onSubmitHandler();
    }
  }, [otpCode]);

  useEffect(() => {
    if (isLoginSuccess) {
      setOtpSuccess(false);
      setSteps(1);
      getUser();
      onClose?.();
    }
  }, [isLoginSuccess, created, onClose]);

  return (
    <div className={styles.stepWrapper}>
      <ModalHeader
        title="Введите код из SMS"
        description={`Отправили SMS с кодом на номер телефона ${formatPhoneNumber(phone)}`}
      />
      <CodeInput
        onChange={otpOnChangeHandler}
        error={isLoginError}
        errorMsg={errorMsg}
      />

      {isFetching ? (
        <div className={styles.loaderWrapper}>
          <Loader className={styles.loader} />
        </div>
      ) : (
        <ButtonsGroup>
          {trigger && !isOtpError && (
          <Button
            disabled={isOtpLoading}
            isLoading={isOtpLoading}
            variant="secondary"
            size="large"
            label="Получить новый код"
            onClick={handleNewOtpRequest}
          />
          )}
          {!trigger && !isOtpError && (
          <Button
            className={styles.timeCounter}
            variant="tertiary"
            size="large"
            label={`Запросить новый код через ${formatTime(timeDelay)}`}
          />
          )}
          {isOtpError && (
          <Button
            className={styles.timeCounter}
            variant="tertiary"
            size="large"
            label={`Превышено кол-во попыток. Новые попытки станут доступны через ${formattedTime} минут`}
          />
          )}
          <Button
            variant="tertiary"
            onClick={handleBack}
            size="large"
            label="Назад"
          />
        </ButtonsGroup>
      )}
    </div>
  );
};
