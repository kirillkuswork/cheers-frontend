import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { useActions } from '@/shareds/hooks/useActions';
import { authActions } from '@/redux/actions/authActions';
import { IAuthModal } from './types';
import styles from './styles.module.scss';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';

export const AuthModal: FC<IAuthModal> = ({ isOpen, onClose }) => {
  const [steps, setSteps] = useState(1);
  const { setOtpSuccess } = useActions(authActions);

  const setStepHandler = useCallback(
    (param?: number) => {
      setSteps(param!);
    },
    [],
  );

  const onCloseModal = () => {
    setOtpSuccess(false);
    setStepHandler(1);
    onClose?.();
  };

  const firstStep = useMemo(() => <FirstStep setSteps={setStepHandler} />, [setStepHandler]);

  const stepsRender = useMemo(() => {
    switch (steps) {
      case 1:
        return firstStep;
      case 2:
        return <SecondStep onClose={onClose} setSteps={setStepHandler} />;
      // case 3:
      //   return <ThirdStep onClose={onClose} setSteps={setStepHandler} />;
      default:
        return firstStep;
    }
  }, [steps, firstStep, onClose, setStepHandler]);

  return (
    <ModalWrapper
      canClose
      isVisible={isOpen}
      className={styles.wrapper}
      onClose={onCloseModal}
    >
      <div className={styles.inner}>{stepsRender}</div>
    </ModalWrapper>
  );
};
