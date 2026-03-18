/* eslint-disable @typescript-eslint/no-explicit-any */

import { IVolume } from '@/redux/services/types/products';

export interface IDropDownVolumeProps {
  selectedOption: IVolume | undefined;
  options: IVolume[] | undefined;
  setSelectedOption: (option: IVolume) => void;
  className?: string;
  label?: string;
}
