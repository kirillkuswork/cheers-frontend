/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { IFilters } from '@/redux/services/types/quiz';
import { useLazyGetWineBySituationQuery } from '@/redux/services/quizApi';
import useQuizFilterLogic from '@/widgets/Quiz/useQuizFilterLogic';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { useActions } from '@/shareds/hooks/useActions';
import { filtersActions } from '@/redux/actions/filtersActions';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PATHS } from '@/shareds/consts/baseConts';
import { selectors } from '@/redux/selectors';
import { IQuizModal } from '@/widgets/Quiz/types';
import { StepFour } from './StepFour';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';
import { StepOne } from './StepOne';
import styles from '../styles.module.scss';

const initialFilters: IFilters = {
  boolean: [],
  string: [],
  number: [],
};

export const WineBySituationModal:FC<IQuizModal> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [getWineBySituation, { data: quizData }] = useLazyGetWineBySituationQuery();
  const { selectedFilters, selectedResponses, updateFilters } = useQuizFilterLogic(initialFilters);
  const [currentStep, setCurrentStep] = useState(0);
  const { setQuizFilters, setQuizFiltersUpdated } = useActions(filtersActions);
  const { isQuizFiltersUpdated } = useSelector(selectors.filtersSelector);

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
    setQuizFiltersUpdated(true);
  }, [setQuizFiltersUpdated, updateFilters]);

  useEffect(() => {
    getWineBySituation();
  }, []);

  useEffect(() => {
    if (isQuizFiltersUpdated && isOpen) {
      setQuizFilters(selectedFilters);
      setQuizFiltersUpdated(false);
      router.push(PATHS.products);
      onClose?.();
    }
  }, [isQuizFiltersUpdated, isOpen]);

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
          onNext={handleNextStep}
          onCancel={onCloseHandler}
          data={quizData[0]}
          selectedId={selectedResponses[0]}
        />
        )}
        {currentStep === 1 && selectedResponses[0] && (
        <StepTwo
          onNext={handleNextStep}
          onCancel={handlePreviousStep}
          data={quizData[1]}
          filterId={selectedResponses[0]}
          selectedId={selectedResponses[1]}
        />
        )}
        {currentStep === 2 && (
        <StepThree
          onNext={handleNextStep}
          onCancel={handlePreviousStep}
          data={quizData[2]}
          initialFilters={selectedFilters}
        />
        )}
        {currentStep === 3 && (
        <StepFour
          onNext={submitFilters}
          onCancel={handlePreviousStep}
          data={quizData[3]}
          initialFilters={selectedFilters}
        />
        )}
      </ModalWrapper>
    );
  }
  return null;
};
