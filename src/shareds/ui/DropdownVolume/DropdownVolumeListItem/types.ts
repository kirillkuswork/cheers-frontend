import { IVolume } from '@/redux/services/types/products';

export interface IDropdownVolumeListItemProps {
  listItem: IVolume;
  selectedOption: IVolume | undefined;
  setSelectedOption: (option: IVolume) => void;
  setIsOpen: (prev: boolean) => void;
}
