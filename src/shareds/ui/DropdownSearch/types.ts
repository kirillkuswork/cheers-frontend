import { ISearchItemProps } from './ProductSearch/types';

export interface IDropdownSearchProps {
  data: ISearchItemProps[];
  isLoading: boolean;
  onClose: () => void;
  searchValue: string;
  isError: boolean;
}
