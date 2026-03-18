export interface IShortDescriptionEnum {
  WINE: string[];
  OTHER_ALCOHOL: string[];
  ACCESSORIES: string[];
}

export interface IAttributeEnum {
  type: number;
  sub_type: number;
  color: number;
  sweetness: number;
  volume: number;
  materials: number;
  grapes: number;
  abv: number;
  country: number;
  region: number;
  bodied_level: number;
  acidity_level: number;
  fizziness_level: number;
  tannin_level: number;
  sweetness_level: number;
  gastronomy: number;
}

export interface ImageTypeEnum {
  MAIN: number;
  LABEL: number;
  ADDITIONAL: number;
}

export interface IReviewStatusEnum {
  MODERATED: number;
  APPROVED: number;
  REJECTED: number;
}

export interface IRoleEnum {
  USER: number;
  EXPERT: number;
  ADMIN: number;
}

export interface IPageLocationEnum {
  first_level_catalog: number;
  second_level_catalog: number;
  third_level_catalog: number;
  main_page: number;
}
export interface IOrderDirectionEnum {
  DESC: 'DESC';
  ASC: 'ASC';
}

export interface IFilterFieldEnum {
  rating_customer: 'rating_customer';
  rating_expert: 'rating_expert';
  min_price: 'min_price';
}

export interface IEnumResponse {
  ShortDescriptionEnum: IShortDescriptionEnum;
  AttributeEnum: IAttributeEnum;
  ImageTypeEnum: ImageTypeEnum;
  ReviewStatusEnum: IReviewStatusEnum;
  RoleEnum: IRoleEnum;
  PageLocationEnum: IPageLocationEnum;
  OrderDirectionEnum: IOrderDirectionEnum;
  FilterFieldEnum: IFilterFieldEnum;
}

export interface IEnumState {
  enumData: IEnumResponse;
  isEnumLoading: boolean;
}
