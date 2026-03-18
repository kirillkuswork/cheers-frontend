/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { IFilters } from '@/redux/services/types/quiz';
import { useLazyGetRuAnalogsQuery } from '@/redux/services/quizApi';
import useQuizFilterLogic from '@/widgets/Quiz/useQuizFilterLogic';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { useActions } from '@/shareds/hooks/useActions';
import { filtersActions } from '@/redux/actions/filtersActions';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { IQuizModal } from '@/widgets/Quiz/types';
import { productsActions } from '@/redux/actions/productsActions';
import { PATHS } from '@/shareds/consts/baseConts';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepsCheeps } from './StepsChips';
import styles from '../styles.module.scss';

const initialFilters: IFilters = {
  boolean: [],
  string: [],
  number: [],
};

export const RuAnalogsModal:FC<IQuizModal> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [getRuAnalogs, { data: quizData }] = useLazyGetRuAnalogsQuery();
  const { selectedFilters, selectedResponses, updateFilters } = useQuizFilterLogic(initialFilters);
  const [currentStep, setCurrentStep] = useState(0);
  const { setQuizFilters, setQuizFiltersUpdated } = useActions(filtersActions);
  const { setQuizHeaderInfo } = useActions(productsActions);
  const { isQuizFiltersUpdated } = useSelector(selectors.filtersSelector);
  const description = 'Вы можете выбрать несколько вариантов';

  const handleNextStep = useCallback((newFilters: IFilters, selectedResponseId: number[] | null) => {
    updateFilters(newFilters, currentStep, selectedResponseId);
    setCurrentStep((prevStep) => prevStep + 1);
  }, [updateFilters, setCurrentStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
    setCurrentStep(0);
  }, [onClose, setCurrentStep]);

  const submitFilters = useCallback((newFilters: IFilters, selectedResponseId: number[] | null) => {
    updateFilters(newFilters, currentStep, selectedResponseId);
    setQuizHeaderInfo({ value: 'Лучшие российские вина для ваших планов!' });
    setQuizFiltersUpdated(true);
  }, [setQuizFiltersUpdated, updateFilters]);

  useEffect(() => {
    getRuAnalogs();
  }, []);

  useEffect(() => {
    if (isQuizFiltersUpdated && isOpen) {
      setQuizFilters(selectedFilters);
      setQuizFiltersUpdated(false);
      router.push(`${PATHS.products}`);
      onClose?.();
    }
  }, [isQuizFiltersUpdated, isOpen]);

  const totalSteps = quizData?.length;

  if (quizData) {
    return (
      <ModalWrapper
        canClose
        isVisible={isOpen!}
        className={styles.wrapper}
        onClose={onCloseHandler}
      >
        {currentStep === 0 && (
          <StepOne
            description={description}
            onNext={handleNextStep}
            data={quizData[0]}
            onCancel={onCloseHandler}
          />
        )}
        {currentStep === 1 && selectedResponses.length > 0 && (
          <StepTwo
            description={description}
            onNext={handleNextStep}
            data={quizData[1]}
            onCancel={handlePreviousStep}
            selectedResponseIds={selectedResponses[0]!}
          />
        )}
        {currentStep >= 2 && (
          <StepsCheeps
            description={description}
            onCancel={handlePreviousStep}
            onNext={currentStep === totalSteps! - 1 ? submitFilters : handleNextStep}
            data={quizData[currentStep]}
          />
        )}

      </ModalWrapper>
    );
  }

  return null;
};
