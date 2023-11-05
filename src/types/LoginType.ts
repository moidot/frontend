import { ResponseDto } from './common';

export interface LoginData {
  email: string;
  name: string;
  accessToken: string;
}

export type GetLoginRes = ResponseDto<LoginData>;
