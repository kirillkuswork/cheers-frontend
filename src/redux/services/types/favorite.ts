import { IPagination } from './banners';
import { ICoordinatesRequest, IPaginationRequest, IProduct } from './products';

export interface ICreateFavoriteResponse {
  product_id: number;
  user_id: number;
}

export interface IGetFavoritesResponse {
  products: IProduct[];
  pagination: IPagination;
}

export interface IGetFavoritesRequest {
  coordinates: ICoordinatesRequest;
  pagination?: IPaginationRequest;
}
