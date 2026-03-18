import {
  Control, FieldErrors, UseFormSetValue, FieldValues,
} from 'react-hook-form';
import { UploadImageType } from '@/admin/components/UploadImage/types';
import { IAdminProductAttribute, IGetAdminProductAttributesResponse } from '@/redux/services/types/admin';

export interface IProductCardFormProps {
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

export interface IImageForm {
  type: UploadImageType;
  title: string;
  hasError: boolean;
  url?: string
  connectId: number,
}

export interface IProductAttributesResult {
  [key: string]: IGetAdminProductAttributesResponse;
}

export type IFetchMoreAttributes = (attributeKey: string) => Promise<{ data: IAdminProductAttribute[] } | undefined>;

export type IMapAttributes = Record<string, Omit<IAdminProductAttribute, 'attributes'>>;
