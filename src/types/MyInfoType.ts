import { ResponseDto } from './common';

export interface MyInfoData {
  participateId: number;
  userName: string;
  locationName: string;
  latitude: number;
  longitude: number;
  transportationType: string;
}

export type GetMyInfoRes = ResponseDto<MyInfoData>;
