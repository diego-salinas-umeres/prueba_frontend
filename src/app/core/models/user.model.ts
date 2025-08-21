export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserRegisterResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}