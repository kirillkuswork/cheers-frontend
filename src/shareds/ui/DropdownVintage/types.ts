/* eslint-disable @typescript-eslint/no-explicit-any */

import { IOption } from '@/entities/Product/MainSectionInfo/types';

export interface IDropDownVintageProps {
  selectedOption: IOption | undefined;
  options: IOption[] | undefined;
  setSelectedOption: (option: IOption) => void;
  className?: string;
  label?: string;
}
