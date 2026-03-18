import { FilterValues } from './filters';

// RESPONSE

export interface IGetCatalogResponse {
  id: number;
  title: string;
  image_url: string;
  has_presets: boolean;
  filters: FilterValues;
}

export interface IPresetValue {
  id: number;
  title: string;
  image_url: string;
  bg_color: string;
  sec_color: string;
  filters: FilterValues;
}

export interface IPresetResponse {
  id: number;
  title: string;
  is_large: boolean;
  values: IPresetValue[];
}

export interface IGetCatalogSecondLevelResponse {
  filters: FilterValues;
  presets: IPresetResponse[];
}
