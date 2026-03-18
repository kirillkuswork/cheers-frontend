export interface IUpdateUserRequest {
  name?: string,
  avatar_url?: string,
  phone?: string,
  email?: string
}

export interface IUpdateUserResponse extends IUpdateUserRequest {
  id: number
}

export interface IGetUserResponse {
  id: number,
  name: string,
  avatar_url: string,
  phone: string,
  email: string
  role_id: 1 | 2 | 3,
}
