import { ICoordinatesRequest } from './products';

export interface IGetOfficesRequest {
  coordinates: ICoordinatesRequest;
  pagination?: {
    cursor: string,
    limit: number
  }
}

interface IOfficePartnerItem {
  id: number;
  name: string;
  image_url: string | null;
  logo_url: string | null;
  marker_url: string | null;
  marked_filled_url: string | null;
  link: string | null;
}

interface IOfficeMetroItem {
  name: string;
  branch_color: string;
}

export interface IOfficeItem {
  id: number;
  partner: IOfficePartnerItem;
  metro: IOfficeMetroItem | null;
  lat: number;
  lon: number;
  address: string;
  phone: string | null;
  work_hour_from: string | null;
  work_hour_to: string | null;
  distance: number;
}

export interface IGetOfficeResponse {
  offices: IOfficeItem[];
  pagination: { cursor: string }
}
