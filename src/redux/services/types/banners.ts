export interface IPagination {
  cursor: string | null,
  limit: number
}

export interface IBanner {
  id: number,
  image_url: string,
  link: string,
  is_advert: true,
  advertiser_name: string,
  erid: string,
  inn: number,
  location_id: number,
  position: number
}

export interface IBannerRequest {
  location: number,
  pagination: IPagination
}

export interface IBannerResponse {
  banners: IBanner[],
  pagination: IPagination['cursor']
}
