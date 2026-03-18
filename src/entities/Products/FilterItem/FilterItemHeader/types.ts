import { IFilterItemProps } from '@/entities/Products/FilterItem/types';
import { ReactNode } from 'react';

export interface IFilterItemHeaderProps extends Pick<IFilterItemProps, 'title'> {
  isOpen: boolean;
  element?: ReactNode
  toggleOpenHandler: () => void;
}
