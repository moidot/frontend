import { ResponseDto } from './common';

export interface LoginData {
  email: string;
  name: string;
  token: string;
}

export type GetLoginRes = ResponseDto<LoginData>;
