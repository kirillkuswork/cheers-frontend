import { IFilters, IQuizResponse } from '@/redux/services/types/quiz';

export interface ICommonStepProps {
  onNext: (filters: IFilters, selectedResponseId: number[] | null) => void;
  onCancel: () => void;
  data: IQuizResponse;
  description?: string;
}

export interface IQuizModal {
  isOpen?: boolean
  onClose: () => void
}
