import { IAdminProductAttribute } from '@/redux/services/types/admin';
import { RefObject } from 'react';
import { IMainInputProps } from '@/shareds/ui/MainInput';

export interface ISelectOption {
  id?: number | null;
  value: string;
}

interface IDropDownProps {
  options?: IAdminProductAttribute[];
  className?: string;
  onChange?: (item: ISelectOption) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  fetchMoreData?: () => void;
  cursor?: string | null;
  selectRef?: RefObject<HTMLDivElement>;
  onSearch?: (query: string | null) => void
  handleScroll?: () => void;
}

export type ISearchInputProps = IDropDownProps & Omit<IMainInputProps, 'onChange'>;
