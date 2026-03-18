export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface ILoginRequest {
  phone: string,
  otp_code: string
}

export interface IGetOtpRequest {
  phone: string
  name?: string
}
export interface IGetOtpResponse {
  created_at: string,
  send_delay: number,
  phone: string,
  created: boolean
}
