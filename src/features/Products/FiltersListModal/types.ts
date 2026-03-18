import { IFilterBarProps } from '@/widgets/Products/FiltersBar/types';
import { ReactNode } from 'react';

export interface IFiltersListModalProps
  extends Pick<
  IFilterBarProps,
  'handleCloseModal' | 'isModalOpen' | 'handleSubmit' | 'resetFilters'
  > {
  children: ReactNode;
  className?: string;
}
