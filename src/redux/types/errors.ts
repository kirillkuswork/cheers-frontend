export interface IErrorResponse {
  status: number;
  data: {
    code: string,
    message: string,
    detail: string | IDetailItem[]
  }
}

export interface IDetailItem {
  loc: (string | number)[],
  msg: string,
  type: string
}
