/* eslint-disable @typescript-eslint/no-explicit-any */
export type DropDownItem<T = any> = {
  label: T;
  value: T;
  field?: T
};

export interface IDropDownProps {
  selectedOption: DropDownItem;
  options: DropDownItem[];
  setSelectedOption: (option: DropDownItem) => void;
  className?: string;
}
