// REQUEST
import { IFilters } from '@/redux/services/types/quiz';

interface IBooleanFilterRequest {
  attribute: string;
  value: boolean;
}

interface INumberFilter {
  attribute: string;
  from_: number;
  to: number;
}

interface IStringFilter {
  attribute: string;
  value: string[];
  has_next: boolean,
}

export interface IFiltersRequest {
  boolean?: IBooleanFilterRequest[];
  string?: IStringFilter[];
  number?: INumberFilter[];
}

export interface IGetFiltersRequest {
  query?: string;
  filters?: IFiltersRequest;
}

export interface IGetFilterRequest {
  query?: string;
  filters?: IFiltersRequest;
  pagination: {
    cursor: string | null, limit: number
  }
}

export interface IGetFilterByNameResponse {
  values: string[],
  pagination: {
    cursor: string | null, limit: number
  }
}

// RESPONSE
interface IBooleanFilterResponse {
  attribute: string;
  value: boolean[];
}

export interface IFiltersResponse {
  boolean?: IBooleanFilterResponse[];
  string?: IStringFilter[];
  number?: INumberFilter[];
}

export interface IGetFiltersResponse {
  filters: IFiltersResponse;
}

export interface FilterValues {
  string: {
    [attribute: string]: {
      [value: string]: boolean;
    };
  };
  boolean: {
    [attribute: string]: boolean;
  };
  number: {
    [attribute: string]: [number, number];
  };
}

export interface FiltersState {
  quizFilters: IFilters | null
  isQuizFiltersUpdated: boolean
}
