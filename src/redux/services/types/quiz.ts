export interface IFilterBoolean {
  attribute: string;
  value: boolean[];
}

export interface IFilterString {
  attribute: string;
  value: string[];
}

export interface IFilterNumber {
  attribute: string;
  from_: number;
  to: number;
}

export interface IFilters {
  boolean: IFilterBoolean[];
  string: IFilterString[];
  number: IFilterNumber[];
}

export interface IQuizItem {
  id: number;
  value: string;
  filters: IFilters;
  description: string;
}

export interface IQuizResponse {
  question: string;
  responses: IQuizItem[];
  multiple_selection: boolean;
}

export interface IQuizHeaderInfo {
  value: string
  description?: string
}
