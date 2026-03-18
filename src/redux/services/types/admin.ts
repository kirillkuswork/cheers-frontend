import { IAttributeEnum, IEnumResponse } from '@/redux/services/types/enum';
import { StaticImageData } from 'next/image';

type FieldTypes = keyof IEnumResponse['OrderDirectionEnum'];

interface IPagination {
  cursor: string | null;
  limit?: number;
}

export interface ISort {
  field: 'updated_at';
  order_direction: FieldTypes | null;
}

export interface IAdminProductPropertiesState {
  country: string;
  color: string;
  type: string;
  subType: string;
  sweetness: string;
  grapes: string;
  gastronomy: string;
  materials: string;
  volume: number;
}

export interface IAdminProduct {
  id: string;
  imageUrl: string;
  name: string;
  isHidden: boolean;
  syncronizedAt: string;
  ratingCustomer: number;
  ratingExpert: number;
  updatedAt: string;
  properties?: Partial<IAdminProductPropertiesState>;
  [key: string]: unknown;
}

export interface IGetAdminProductsResponse {
  products: IAdminProduct[];
  pagination: Pick<IPagination, 'cursor'>;
}

export interface IGetAdminProductsRequest {
  query?: string | null;
  is_syncronized?: boolean | null;
  is_hidden?: boolean | null;
  sort?: ISort;
  pagination?: IPagination;
}

export interface IUpdateProductVisibilityRequest {
  id: string;
  is_hidden: boolean;
}

export interface ISelectedBaseCard {
  id?: string;
  name: string;
}

export interface IGetAdminBaseCardRequest {
  query?: string | null;
  pagination?: IPagination;
}
export interface IGetAdminBaseCardResponse {
  pagination: Pick<IPagination, 'cursor'>;
  cards: ISelectedBaseCard[];
}

export interface IAdminBaseCardProducer {
  id: number;
  name: string;
  description: string;
  image_url: string;
}
export interface IAdminBaseCardByIdResponse {
  id: number;
  name: string;
  temperature: string;
  brief_info: string;
  producer: IAdminBaseCardProducer;
}

export interface IGetAdminProductAttributesRequest {
  query?: string | null;
  pagination: IPagination;
  attributeId?: number | null;
}
export interface IAdminProductAttribute {
  id?: number | null;
  value: string;
  attributes?: number[];
}
export interface IGetAdminProductAttributesResponse {
  pagination: Pick<IPagination, 'cursor'>;
  values: IAdminProductAttribute[];
}

export interface ISelectedProductValues {
  name?: string;
  value?: string;
}

// CREATE PRODUCT
interface IProducer {
  id: number;
  name?: string | null;
  description?: string | null;
}

interface IBaseProductCard {
  id: number;
  name?: string | null;
  brief_info?: string | null;
  temperature?: string | null;
  producer: IProducer;
}

export interface IAdditionalAttribute {
  attribute_id: number | null;
  value?: string | null;
}

export interface IAttribute {
  value_id: number | null;
  attribute_id?: number | null;
  attribute_title?: string | null;
  value?: string | null;
}

interface ITasteNote {
  id: number;
  percent: number;
}

interface IRating {
  rating_customer?: number | null;
  rating_expert?: number | null;
  vivino_rating?: number | null;
}

interface IImage {
  image_url: string;
}

export interface ITasteNoteWithName {
  id: number;
  name: string;
  percent: number;
}

export interface ITasteNotes {
  id: number;
  value: string;
}
export interface ITasteNoteRequest {
  pagination: IPagination;
}
export interface ITasteNoteResponse {
  pagination: IPagination;
  taste_notes: ITasteNotes[];
}

export interface IAdminPartner {
  id: number;
  name: string;
  image_url: string | StaticImageData;
  logo_url: string;
  marker_url: string;
  marker_filled_url: string;
  link: string;
  [key: string]: unknown;
}
export interface IGetAdminPartnersRequest {
  product_id: number;
  pagination?: IPagination;
}
export interface IGetAdminPartnersResponse {
  partners: IAdminPartner[];
  pagination: Pick<IPagination, 'cursor'>;
}

interface IShopPartner {
  id: number;
  name: string;
  image_url: string;
  marker_url: string;
  marker_filled_url: string;
}

interface IMetro {
  name: string;
  branch_color: string;
}

interface IOffice {
  id: number;
  partner: IShopPartner;
  metro: IMetro;
  lat: number;
  lon: number;
  address: string;
  phone: string;
  work_hour_from: string;
  work_hour_to: string;
  [key: string]: unknown;
}

export interface IGetAdminOfficesRequest {
  partnerId: number;
  pagination: IPagination;
}
export interface IGetAdminOfficesResponse {
  offices: IOffice[];
  pagination: IPagination['cursor'];
}

export interface IOffer {
  id: number;
  link: string;
  product_id: number;
  price: number;
  discount_price: number;
  discount_percent: number;
  start_at: string;
  end_at: string;
  office: IOffice;
  [key: string]: unknown;
}
export interface IGetAdminOffersRequest {
  productId: number;
  pagination: IPagination;
}
export interface IGetAdminOffersResponse {
  offers: IOffer[];
  pagination: Pick<IPagination, 'cursor'>;
}

export interface IOfferFormRequest {
  link: string;
  product_id: number;
  partner_id: number;
  office_ids: number[];
  price: number;
  discount_price: number;
  discount_percent: number;
  start_at: string;
  end_at: string;
  partner_product_id: string;
}
export interface IOfferFormResponse extends IOfferFormRequest {
  id: number;
}

// Тип для формы создания продукта
export interface IAdminProductForm extends IRating {
  base_product_card: IBaseProductCard;
  prefix?: string | null;
  suffix?: string | null;
  year: number;
  vivino_id?: number | null;
  dye?: string | null;
  flavour?: string | null;
  taste?: string | null;
  degustation?: string | null;
  style?: string | null;
  is_hidden: boolean;
  region_place?: number | null;
  vineyard_place?: number | null;
  world_place?: number | null;
  synchronized_at?: string | null;
  additional_attributes?: IAdditionalAttribute[] | null;
  attributes: IAttribute[];
  taste_notes?: ITasteNote[] | null;
}

export interface IAdminProductFormRequest {
  form: IAdminProductForm;
  id: number;
}

// Тип для ответа при создании продукта
export interface IProductResponse extends IRating {
  id: number;
  base_product_card: IBaseProductCard & { producer: IProducer & IImage };
  images: string[];
  prefix: string;
  suffix: string;
  year: number;
  vivino_id: number;
  dye: string;
  taste: string;
  flavour: string;
  synchronized_at: string;
  region_place: number | null;
  vineyard_place: number | null;
  world_place: number | null;
  degustation: string;
  style: string;
  price: string;
  is_hidden: boolean;
  additional_attributes: IAttribute[];
  taste_notes: ITasteNoteWithName[];
  attributes: IAttribute[];
  grapes: IAttribute[];
  gastronomy: IAttribute[];
  country: IAdminProductAttribute;
  volume: IAdminProductAttribute;
  materials: IAdminProductAttribute;
  color: IAdminProductAttribute;
  region: IAdminProductAttribute;
  sub_type: IAdminProductAttribute;
  type: IAdminProductAttribute;
  sweetness: IAdminProductAttribute;
}

export interface IImages {
  id: number;
  type: number;
  url: string;
}

// PRODUCER IMAGE
export interface IProducerImageRequest {
  producer_id: number;
  image: FormData;
}
export interface IProducerImageResponse {
  id: number;
}

// PRODUCT IMAGE
export interface IProductImageRequest {
  id?: number;
  product_id?: number;
  type: number;
  image: FormData;
}
export interface IProductImageResponse {
  image_id: number;
  image_url: string;
}

// PRODUCER LIST
export interface IAdminProducer extends Pick<IProducer, 'id' | 'name'> {}
export interface IGetAdminProducerListRequest {
  query?: string | null;
  pagination?: IPagination;
}
export interface IGetAdminProducerListResponse {
  pagination: Pick<IPagination, 'cursor'>;
  producers: IAdminProducer[];
}

// VIVINO
export interface IVivinoSyncRequest {
  vivino_id: number;
  year?: number | null;
}
export interface IVivinoSyncResponse extends Pick<IRating, 'vivino_rating'> {
  attributes: Pick<
  IAttributeEnum,
  | 'acidity_level'
  | 'bodied_level'
  | 'fizziness_level'
  | 'sweetness_level'
  | 'tannin_level'
  >;
  producer: Pick<IProducer, 'name'>;
  taste_notes: Array<ITasteNotes & { percent: number }>;
  vineyard_place: number | null;
  region_place: number | null;
  world_place: number | null;
}
