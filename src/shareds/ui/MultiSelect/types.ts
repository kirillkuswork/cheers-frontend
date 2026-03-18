import { IAdminProductAttribute } from '@/redux/services/types/admin';
import { RefObject } from 'react';
import { IMainInputProps } from '@/shareds/ui/MainInput';

interface IDropDownProps {
  options: IAdminProductAttribute[];
  className?: string;
  value?: IAdminProductAttribute[];
  onChange?: (items: IAdminProductAttribute[]) => void;
  fetchMoreData?: () => void;
  cursor?: string | null;
  selectRef?: RefObject<HTMLDivElement>;
  handleScroll?: () => void;
  onSearch?: (query: string | null) => void
  isSearch?: boolean
  isFetching?: boolean
}

export type IMultiSelectInputProps = IDropDownProps & IMainInputProps;
