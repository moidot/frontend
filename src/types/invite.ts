import { ResponseDto } from './common';

export interface PostGroupParticipateData {
  groupId: number;
  userName: string;
  locationName: string;
  latitude: number;
  longitude: number;
  transportationType: string;
  password: string;
}

export interface PostGroupParticipateResInterface {
  participationId: number;
  groupId: number;
  userId: number;
  userName: string;
  locationName: string;
  latitude: number;
  longitude: number;
  transportation: string;
}

export type PostGroupParticipateReq = PostGroupParticipateData;
export type PostGroupParticipateRes = ResponseDto<PostGroupParticipateResInterface>;
