import { IOption } from '@/entities/Product/MainSectionInfo/types';

export interface IDropdownVintageListItemProps {
  listItem: IOption;
  selectedOption: IOption | undefined;
  setSelectedOption: (option: IOption) => void;
  setIsOpen: (prev: boolean) => void;
}
