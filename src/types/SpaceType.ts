import { TransportType } from '@/components/common/main/AdminBox';
import { ResponseDto } from './common';

export interface GetGroupProps {
  groupId: number;
  adminEmail: string;
  name: string;
  date: string;
  participantsByRegion: GetParticipantsByRegionProps[];
}
export interface GetParticipantsByRegionProps {
  regionName: string;
  participations: GetParticipationProps[];
}
export interface GetParticipationProps {
  particiaptionId: number;
  userEmail: string;
  userName: string;
  locationName: string;
  transportation: string;
}

export interface GetParticipateProps {
  groupId: number;
  groupName: string;
  groupAdminName: string;
  groupDate: string;
  groupParticipates: number;
  confirmPlace: string;
  bestPlaceName: string[];
  participantNames: string[];
}
// 스페이스 추천역 조회 API
export interface GetGroupBestRegionProps {
  name: string;
  latitude: number;
  longitude: number;
  moveUserInfo: GetUserInfoProps[];
}

export interface GetUserInfoProps {
  isAdmin: boolean;
  userId: number;
  userName: string;
  transportationType: TransportType;
  transitCount: number;
  totalTime: number;
  totalDistance: number;
  path: GetPathProps[];
}
export interface GetPathProps {
  x: number;
  y: number;
}

// 내가 참여하고 있는 스페이스 조회API

export interface GetGroupParticipateProps {
  groupId: number;
  groupName: string;
  groupAdminName: string;
  groupDate: string;
  groupParticipates: number;
  confirmPlace: string;
  bestPlaceNames: string[];
}
export type GetGroupRes = ResponseDto<GetGroupProps>;
export type GetUserParticipateListRes = ResponseDto<GetParticipateProps[]>;
export type GetGroupBestRegionListRes = ResponseDto<GetGroupBestRegionProps[]>;
export type GetGroupParticipateListRes = ResponseDto<GetGroupParticipateProps[]>;
