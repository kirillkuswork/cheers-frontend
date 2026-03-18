// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FieldValues } from 'react-hook-form/dist/types/fields/';
import { IFilterBarProps } from '@/widgets/Products/FiltersBar/types';

export interface IFiltersListProps extends Pick<IFilterBarProps, 'filters'> {
  control: FieldValues;
  onGetNewOffices: () => void;
  isLoadingOffice: boolean,
  initialOpenState: { [key: string]: boolean };
}
