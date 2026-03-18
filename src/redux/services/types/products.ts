import { IEnumResponse } from '@/redux/services/types/enum';
import { IQuizHeaderInfo } from '@/redux/services/types/quiz';
import { IFiltersRequest } from './filters';

// REQUEST
type FieldTypes = keyof IEnumResponse['FilterFieldEnum'];
type OrderDirectionTypes = keyof IEnumResponse['OrderDirectionEnum'];

export interface ISortRequest {
  field: FieldTypes;
  order_direction: OrderDirectionTypes;
}

export interface ICoordinatesRequest {
  lat: number
  lon: number
}

export interface IPaginationRequest {
  cursor?: string | null
  limit?: number
}

export interface IGetProductsRequest {
  query?: string;
  coordinates: ICoordinatesRequest
  sort?: ISortRequest;
  filters?: IFiltersRequest;
  pagination?: IPaginationRequest;
  office_id?: number | null;
}

export interface IVolume {
  id: number;
  volume: number | null;
  selected: boolean;
}

// RESPONSE
export interface IVintage {
  year?: number | null;
  rating_customer?: number | null;
  rating_expert?: number | null;
  selected: boolean;
  volumes: IVolume[];
}

interface IDescription {
  brief_info: string;
  dye: string;
  flavour: string;
  taste: string;
  degustation: string;
  region_style: string;
  temperature: string;
}

export interface IDescriptionCurrent {
  brief_info?: string | null;
  dye?: string | null;
  flavour?: string | null;
  taste?: string | null;
  degustation?: string | null;
  region_style?: string | null;
  temperature?: string | null;
}

export interface ITasteNote {
  name: string;
  percent: number;
}

interface IProducer {
  name: string;
  description?: string;
  image_url?: string;
}

interface IProperties {
  type: string;
  grapes: string;
  gastronomy: string;
  color: string;
  country: string;
  sweetness: string;
  region?: string;
  volume?: string;
}

export interface IPropertiesCurrent {
  type?: string;
  sub_type?: string;
  country?: string;
  region?: string;
  color?: string;
  sweetness?: string;
  volume?: string;
  grapes?: string;
  materials?: string;
}

interface IProducerCurrent {
  name: string;
  description: string | null;
  image_url: string | null;
}

export interface IPartner {
  id: number;
  name: string;
  image_url: string | null;
  market_url: string | null;
  market_filled_url: string | null;
}

export interface IPromo {
  value: string;
  description: string | null;
}
export interface IProductOffer {
  offers_count: number;
  id: number;
  name: string;
  link: string | null;
  lat: number;
  lon: number;
  distance: number;
  address: string | null;
  metro: {
    line_color: string | null;
    station_name: string | null;
  }
  metro_line_color: string | null;
  metro_station: string | null;
  price: number;
  old_price: number;
  partner: IPartner;
  discount: number | null;
  promo?: IPromo | null;
}
export interface IProduct {
  id: number;
  image_url?: string | null;
  name: string;
  vintages?: IVintage[];
  price?: string;
  old_price: number | null;
  discount: number | null;
  year?: number;
  is_liked: boolean;
  is_hidden: boolean;
  rating_customer?: number;
  rating_expert?: number;
  world_place?: number;
  region_place?: number;
  vineyard_place?: number;
  description: IDescription;
  properties?: IProperties;
  taste_notes?: ITasteNote[];
  additional_properties?: Record<string, unknown>;
  producer: IProducer;
  short_description?: string[];
  offer: IProductOffer | null;
}

export interface IProductCurrent {
  id: number;
  abv?: number;
  images?: string[];
  name: string;
  image_url?: string
  vintages?: IVintage[];
  price?: string | null;
  year?: number | null;
  is_liked: boolean;
  is_hidden: boolean;
  rating_customer?: number | null;
  rating_expert?: number | null;
  world_place?: number | null;
  region_place?: number | null;
  vineyard_place?: number | null;
  description: IDescriptionCurrent;
  properties?: IPropertiesCurrent;
  taste_notes?: ITasteNote[] | null;
  additional_properties?: Record<string, unknown>;
  producer: IProducerCurrent;
  short_description?: string[];
  offer: IProductOffer | null;
}

interface IPagination {
  cursor: string;
}

export interface IGetProductsResponse {
  products: IProduct[];
  pagination: IPagination;
}

export interface IProductsState {
  sort: ISortRequest
  quizHeaderInfo: IQuizHeaderInfo | null
}
export interface IPresetState {
  sort: ISortRequest
}
export interface IGetProductByIdResponse {
  product: IProduct;
}
export interface IGetProductByIdRequest {
  id?: string;
  coordinates: ICoordinatesRequest;
}

export interface IGetStatisticForProductRequest {
  id?: string;
  is_expers_only: boolean;
}

export interface IStatisticForProduct {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  total: number | null;
  avg_rating: number | null;
}

export interface IGetReviewsRequest {
  id: string;
  isExpert: boolean | null;
  cursor: string | null;
  limit?: number;
  prevData?: IGetReviewsResponse | null,
}

export interface IGetOfferRequest {
  id: string;
  cursor: string | null;
  limit?: number;
  coordinates: ICoordinatesRequest;
}

interface IBaseUserInfo {
  name: string;
  avatar_url: string | null;
  role_id: 1 | 2 | 3;
}

export interface IUserReviewItem extends IBaseUserInfo {
  is_owner: string;
}
export interface IReviewItem {
  id: number;
  product_id: number;
  rating: number;
  description: string | null;
  user: IUserReviewItem;
  created_at: string;
}

export interface IGetReviewsResponse {
  reviews: IReviewItem[];
  pagination: { cursor: string };
}

export interface IReviewInfo {
  rating: number,
  description: string,
}

export interface ICreateReviewReq extends IReviewInfo {
  productId: number,
}
export interface IUpdateReviewReq extends IReviewInfo {
  id: number
}

export interface IMyReview {
  id: number,
  product_id: number,
  rating: number,
  description: string,
  user: IBaseUserInfo,
  status_id: 1 | 2 | 3,
  created_at: string
}

interface IPromoItem {
  value: string;
  description?: string | null;
}

interface IPartnerItem {
  id: number;
  name: string;
  image_url: string | null;
  marker_url: string | null;
  marker_filled_url: string | null;
}

interface IMetroItem {
  name: string;
  branch_color: string;
}

export interface IOfferItem {
  id: number;
  partner: IPartnerItem;
  link: string | null;
  lat: number;
  lon: number;
  distance: number;
  address: string;
  metro: IMetroItem;
  work_hour_from: string | null;
  work_hour_to: string | null;
  phone: string | null;
  price: number;
  old_price: number;
  discount: number | null;
  promo: IPromoItem;
}

export interface IGetOfferResponse {
  offers: IOfferItem[];
  pagination: { cursor: string };
}

export interface IGetPresetRequest {
  id: string;
  coordinates: ICoordinatesRequest;
  sort?: ISortRequest;
  pagination: IPaginationRequest;
}

export interface IGetPresetResponse {
  products: IProduct[];
  pagination: { cursor?: string | null };
  path_name: string;
  title: string | null;
  description?: string | null;
  header_image_url?: string | null;
  message?: string;
}
