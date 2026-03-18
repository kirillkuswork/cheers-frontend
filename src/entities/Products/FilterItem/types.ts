import { IToggleProps } from '@/shareds/ui/Toggle/types';
import { ReactNode } from 'react';

export interface IFilterItemProps {
  title: string;
  children?: ReactNode;
  filterTitleSubElement?: ReactNode;
  initialIsOpen?: boolean
}

export interface IFilterToggleItemProps
  extends IToggleProps,
  IFilterItemProps {
  className?: string;
}
