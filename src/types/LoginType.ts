import { ResponseDto } from './common';

export interface LoginData {
  userId: number;
  email: string;
  name: string;
  accessToken: string;
}

export type GetLoginRes = ResponseDto<LoginData>;
