import {
  Control, FieldErrors, FieldValues, UseFormSetValue,
} from 'react-hook-form';
import { IProductAttributesResult } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';

export interface ISyncFormType {
  control: Control;
  errors: FieldErrors;
  product_id?: number;
  imagesError?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  isLoading?: boolean;
  values?: FieldValues;
  attributeResults?: IProductAttributesResult;
  editMode?: boolean;
  baseCard?: boolean;
}
